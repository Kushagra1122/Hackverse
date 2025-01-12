import requests

def download_pdf(url, save_path):
    """
    Downloads a PDF from a given URL and saves it to the specified local path.
    
    Args:
    - url (str): The URL of the PDF to download.
    - save_path (str): The local path to save the downloaded PDF.
    
    Returns:
    - None
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP request errors
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"PDF downloaded successfully and saved to: {save_path}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading PDF: {e}")

