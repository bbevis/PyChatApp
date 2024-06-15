import openai
import requests
import json
import os
import config
import prompts as pg

OPENAI_API_KEY = config.api_key

if OPENAI_API_KEY is None:
    raise ValueError("OpenAI API key is not detected. Consider setting API key in environment variables.")


openai.api_key = OPENAI_API_KEY

def chat_gpt(prompt, context):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt},
                  {"role": "system", "content": context}]
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    writer_statement = "we should always help everyone"

    prompt = pg.get_prompt("baseline", writer_statement)
    # prompt = pg.get_prompt("baseline", writer_statement, opposing_view, topic)
    response = chat_gpt(prompt = prompt,
                        context = "You are a human writer attepting to discuss a controversial issue with someone with an opposing view")
    
    print('')
    print(prompt)
    print('')
    print(response)
