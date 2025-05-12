
from fastapi import FastAPI, Query
import requests
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

key = "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"

llm = OpenAI(temperature=0.7, openai_api_key=key)

@app.get("/tech-articles")
def get_articles():
    res = requests.get("https://dev.to/api/articles?tag=technology&per_page=5")
    return res.json()

@app.get("/summarize")
def summarize_article(title: str = Query(...), body: str = Query(...)):
    prompt = PromptTemplate(
        input_variables=["title", "body"],
        template=(
            "Summarize the following tech article and extract key concepts.\n\n"
            "Title: {title}\n\n"
            "Content: {body}\n\n"
            "Return a summary and a list of important concepts:"
        )
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain.run({"title": title, "body": body})
