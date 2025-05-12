
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

key = os.getenv("OPENAI_API_KEY")

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
