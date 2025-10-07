import os
# Import the specific Google model class
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import fitz  # PyMuPDF
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key
api_key = os.getenv('GOOGLE_API_KEY')

if api_key is None:
    raise ValueError("API key not found. Please set the GEMINI_API_KEY environment variable.")

# -------------------------------
# 1. Extract text from PDF
# (This function remains the same)
# -------------------------------
def extract_text_from_pdf(pdf_path):
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text()
    return text

# -------------------------------
# 2. Summarize resume with Gemini
# -------------------------------
def summarize_resume(resume_text):
    # Instantiate the Gemini LLM
    # Use 'gemini-2.5-flash' or another suitable Gemini model
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash") # LangChain LLM
    
    prompt = PromptTemplate(
        input_variables=["resume_text"],
        template="""
Summarize the following resume into structured sections:
Name, Contact, Education, Experience, Projects, Skills, Certifications.
Include only key points.

Resume Text:
{resume_text}
"""
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    # The .invoke() method is often preferred over .run() in newer LangChain versions,
    # but .run() is kept here for minimal change and compatibility with the original code structure.
    summary = chain.run(resume_text)
    return summary

# -------------------------------
# 3. Generate HTML website with Gemini
# -------------------------------
def generate_html(summary_text):
    # Instantiate the Gemini LLM
    # Use 'gemini-2.5-flash' or another suitable Gemini model
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash") 
    
    prompt = PromptTemplate(
        input_variables=["summary_text"],
        template="""
Using this resume summary, generate a complete HTML + CSS portfolio website.
It should be **structurally similar to the provided image example**, featuring:
- A **sticky navigation bar** at the top with "Home, About, Projects, Contact" links.
- A prominent **hero section** with a large, centered heading and a call-to-action button ("Projects").
- A **fixed social media sidebar** on the left with icons (LinkedIn, Twitter, YouTube, GitHub, Instagram).
- Placeholder for a circular profile image next to the name in the navigation.

**Aesthetic Requirements:**
- Use an **aesthetic pink pastel color scheme** throughout the website.
- The background should have a **subtle, light geometric pattern** (like the triangles in the reference image) but in pastel pink/white/grey tones, or a **soft gradient background**.
- Ensure the design is **clean, modern, and professional**.
- All sections (About, Projects, Skills, Contact) should follow the hero section.
- Make it fully **responsive** for mobile devices.

Resume Summary:
{summary_text}
"""
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    html_code = chain.run(summary_text)
    return html_code

# -------------------------------
# 4. Main function
# (This function remains the same)
# -------------------------------
def main(pdf_path):
    # Step 1: Extract text
    resume_text = extract_text_from_pdf(pdf_path)
    
    # Step 2: Summarize resume
    summary = summarize_resume(resume_text)
    
    # Step 3: Generate HTML website
    portfolio_website = generate_html(summary)
    
    # Step 4: Save website
    with open("portfolio.html", "w") as f:
        f.write(portfolio_website)
    
    print("Portfolio website generated successfully as index.html!")

# -------------------------------
# 5. Run script
# -------------------------------
if __name__ == "__main__":
    pdf_path = "Shesadree_P_CV.pdf"  # Replace with your resume file
    main(pdf_path)