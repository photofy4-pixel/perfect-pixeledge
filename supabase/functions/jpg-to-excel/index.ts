import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing image for data extraction...");

    // Call Lovable AI with vision capabilities to extract table data
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert at extracting tabular data from images. 
Your task is to analyze the image and extract any structured data (tables, lists, forms) into a JSON format that can be converted to Excel.
Return the data as a JSON object with this structure:
{
  "sheets": [
    {
      "name": "Sheet1",
      "data": [
        ["Header1", "Header2", "Header3"],
        ["Value1", "Value2", "Value3"],
        ...
      ]
    }
  ]
}
If the image contains text but no clear table structure, organize it into a meaningful table format.
If the image contains a table, preserve its structure exactly.
Always respond with valid JSON only, no additional text.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all tabular data from this image and return it in the JSON format specified."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI Response:", content);

    // Parse the JSON response from the AI
    let extractedData;
    try {
      extractedData = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", content);
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("AI response is not valid JSON");
      }
    }

    return new Response(JSON.stringify(extractedData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in jpg-to-excel function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
