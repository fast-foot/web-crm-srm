import os
import smtplib

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate


class MailService(object):
    def __init__(self):
        self.sender = 'alex.chudovsky@gmail.com'
        self.username = 'alex.chudovsky@gmail.com'
        self.pwd = 'PWD'

    def send_email(self, recipient_email, recipient_name, subject, file_path):
        msg = MIMEMultipart()
        msg['From'] = self.sender
        msg['To'] = recipient_email
        msg['Date'] = formatdate(localtime=True)
        msg['Subject'] = subject

        msg.attach(MIMEText('Dear {}. Please, give a little time to review our suggestion.\n'
                            'Thanks for watching!'.format(recipient_name)))

        part = MIMEBase('application', "octet-stream")
        part.set_payload(open(file_path, "rb").read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment; filename="{0}"'.format(os.path.basename(file_path)))
        msg.attach(part)

        server, port = 'smtp.gmail.com', 587
        smtp = smtplib.SMTP(server, port)
        smtp.starttls()
        smtp.login(self.username, self.pwd)
        smtp.sendmail(self.sender, recipient_email, msg.as_string())
        smtp.quit()