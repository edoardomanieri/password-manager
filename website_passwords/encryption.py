import base64

from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC


def _generate_key(master_password):
    encoded_master_password = master_password.encode()
    salt = b"\xb9\x1f|}'S\xa1\x96\xeb\x154\x04\x88\xf3\xdf\x05"
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend(),
    )
    key = base64.urlsafe_b64encode(kdf.derive(encoded_master_password))
    return key


def encrypt(password, master_password):
    key = _generate_key(master_password)
    cipher_suite = Fernet(key)
    cipher_text = cipher_suite.encrypt(password.encode()).decode()
    return cipher_text


def decrypt(cipher_text, master_password):
    key = _generate_key(master_password)
    cipher_suite = Fernet(key)
    password_plain = cipher_suite.decrypt(cipher_text.encode()).decode()
    return password_plain
