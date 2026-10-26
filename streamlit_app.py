"""CursosHub no Streamlit.

O site é HTML/CSS/JS puro. Este app lê os arquivos da pasta, junta tudo em uma única
página e a exibe dentro do Streamlit com st.iframe (ou, em versões antigas do Streamlit, com st.components.v1.html).

Rodar localmente:  streamlit run streamlit_app.py
"""
from pathlib import Path
import re

import streamlit as st

ROOT = Path(__file__).parent

st.set_page_config(page_title="CursosHub — descubra seu próximo passo", page_icon="🎓", layout="wide")

# Tira o espaço em branco do topo para o site ocupar a tela.
st.markdown(
    "<style>.block-container{padding-top:1rem;padding-bottom:0;max-width:1200px}"
    "header[data-testid='stHeader']{display:none}</style>",
    unsafe_allow_html=True,
)


@st.cache_data
def build_page() -> str:
    """Devolve o site inteiro em um único HTML (CSS e JS embutidos)."""
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    css = (ROOT / "style.css").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="style.css">', f"<style>{css}</style>")

    def inline_script(match: re.Match) -> str:
        code = (ROOT / match.group(1)).read_text(encoding="utf-8")
        return f"<script>{code}</script>"

    return re.sub(r'<script src="([\w.-]+\.js)"></script>', inline_script, html)


# A altura é fixa porque o Streamlit não sabe o tamanho do conteúdo do iframe.
# A página rola dentro do quadro. Ajuste se preferir.
page = build_page()
if hasattr(st, "iframe"):
    # Streamlit recente: st.iframe (components.v1.html está obsoleto).
    st.iframe(page, height=1500)
else:
    import streamlit.components.v1 as components
    components.html(page, height=1500, scrolling=True)
