from flask import Flask, render_template, request, send_file, session, jsonify
from fpdf import FPDF
import os
import time
from urllib.parse import urlparse
from scanner import PandaScanner  # Your advanced scanner

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['TEMPLATES_AUTO_RELOAD'] = True

scanner = PandaScanner()

class PDFReport(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(True, margin=15)

    def header(self):
        self.set_font('Arial', 'B', 18)
        self.set_text_color(41, 128, 185)
        self.cell(0, 10, 'PandaScanPro Security Report', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_report(findings, url):
    pdf = PDFReport()
    pdf.add_page()

    # Title
    pdf.set_font('Arial', 'B', 24)
    pdf.set_text_color(44, 62, 80)
    pdf.cell(0, 15, f'Security Report for {url}', ln=1, align='C')

    # Summary
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 8, f"Report generated on {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")

    # Findings
    for section, data in findings.items():
        pdf.set_font('Arial', 'B', 16)
        pdf.set_text_color(52, 152, 219)
        pdf.cell(0, 10, section.replace('_', ' ').title(), ln=1)

        pdf.set_font('Arial', '', 12)

        if isinstance(data, dict):
            for k, v in data.items():
                pdf.cell(5)
                pdf.cell(0, 8, f'- {k}: {v}', ln=1)
        elif isinstance(data, list):
            for item in data:
                pdf.cell(5)
                pdf.cell(0, 8, f'- {item}', ln=1)
        else:
            pdf.multi_cell(0, 8, str(data))

        pdf.ln(5)

    os.makedirs('reports', exist_ok=True)
    report_path = f'reports/report_{int(time.time())}.pdf'
    pdf.output(report_path)
    return report_path

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/scan', methods=['POST'])
def scan():
    try:
        url = request.json.get('url', '').strip()
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url

        parsed_url = urlparse(url)
        domain = parsed_url.netloc

        results = {
            "headers": scanner.scan_headers(url),
            "sql_injection": scanner.scan_sqli(url),
            "xss": scanner.scan_xss(url),
            "directories": scanner.scan_directories(url),
            "ports": scanner.scan_ports(domain),
            "subdomains": scanner.get_subdomains(domain),
            "geoip": scanner.get_geoip(domain),
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
        }

        report_path = generate_report(results, url)
        session['report_path'] = report_path

        return jsonify({
            "status": "success",
            "results": results,
            "report_url": "/download_report"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/download_report')
def download_report():
    report_path = session.get('report_path')
    if report_path and os.path.exists(report_path):
        return send_file(report_path, as_attachment=True)
    return "Report not found", 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')





