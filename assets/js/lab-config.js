// Question Template
// "title": "",
// "description": "",
// "packages": [],
// "sampleParam": [],
// "functionName": "",
// "additionalFunctions": [],
// "test":[],
// "skeleton": [
// ],
// "hints": [],
// "key": "",

function man(feet){
  if(feet==3) return "elderly";
  else if(feet==2) return "adult";
  else if(feet==4) return "infant";
  else return "unknown";
}

function prime(max){
  prime_list = [];
  for(i = 2; i < max + 1; i++){
    flag = true;
    for(j = 2; j < i/2+1; j++){
      if(i%j == 0){
        flag = false;
        break;
      }
    }
    if(flag) prime_list.push(i);
  }
  return prime_list;
}


var config = {
    '0': {
      "title": "Python Playground🎮",
      "description": "Feel free to try Python🐍 here.<br> Do you know what is a Konami Code? Type the Konami Code to import packages!<br>⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️",
      "packages": [],
      "sampleParam": [],
      "functionName": "",
      "additionalFunctions": [],
      "test":[],
      "skeleton": [
      ],
      "hints": [
        `
        If you see <code>ModuleNotFoundError: The module 'xxx' is included in the Pyodide distribution, but it is not installed.</code>
        Please input the Konami code to trigger a prompt and import packages!`,
      ]
    },
    "err": {
        "title": "Sorry!",
        "description": "This question does not exists!",
        "packages": [],
        "sampleParam": [],
        "functionName": "",
        "additionalFunctions": [],
        "test":[],
        "skeleton": [
        ],
        "hints": []
    },
    '1': {
      "title": "Area of Circle",
      "description": "🧮➕🔢<br>Write a function <code>area_of_circle(r)</code> that calculates the area of ciecle.<br> Given that radius <code>r = 3 </code>is passed to the function, the function should return <code>28</code>. Please use 3.14 for pi and round off the value to nearest integer",
      "functionName": "area_of_circle",
      "additionalFunctions": [],
      "packages": [],
      "sampleParam": [3],
      "test":[
"assert area_of_circle(0) == 0",
"assert area_of_circle(5) == 78",
"assert area_of_circle(7) == 154"
      ],
      "skeleton": [
"def area_of_circle(r):",
"    # TODO: Complete the function to calculate the area of circle. Please use <code>3.14</code> for π and round off the value to nearest integer",
"",
"print(area_of_circle(3))",
""
      ],
      "hints": [
        `
        1. What is the formula for area of circle? <code>π * r<sup>2</sup></code><br>
        2. To round off a value in python, you may use <code>round(x)</code><br>
        3. There are 3 test case in this question:<br>
          - <code>feet = 0</code>, return <code>0</code><br>
          - <code>feet = 5</code>, return <code>78</code><br>
          - <code>feet = 7</code>, return <code>154</code><br>
        `
      ],
      "key": '7N9WBG6WJ2'
    },
    '2': {
        "title": "Sphinx's riddle👩🦁",
        "description": "🧩The Sphinx asked: What goes on four feet in the morning, two feet in midday, and three feet in the evening? <br> 👨Oedipus answered: 'Man: as an infant👶, he crawls on all fours; as an adult🧑, he walks on two legs and; in old age👴, he uses a walking stick<br><br>Complete the function <code>man(feet)</code> that returns 'infant'/'adult'/'elderly' depends on the number of feet. Return 'unknown' if the number of feet is not 2, 3 or 4.<br> Given that <code>feet = 2</code> is passed to the function, the function should return <code>adult</code>.",
        "packages": [],
        "sampleParam": [2],
        "functionName": "man",
        "additionalFunctions": [],
        "test":[
"assert man(3) == '"+man(3)+"'",
"assert man(2) == '"+man(2)+"'",
"assert man(4) == '"+man(4)+"'",
"assert man(5) == '"+man(5)+"'"
        ],
        "skeleton": [
"def man(feet):",
"\tif feet == 4:",
"",
"\telif feet == 2:",
"",
"print(man(2))",
""
        ],
        "hints": [
          `
          1. There are 4 test case in this question:<br>
            - <code>feet = 2</code>, return <code>'adult'</code><br>
            - <code>feet = 3</code>, return <code>'elderly'</code><br>
            - <code>feet = 4</code>, return <code>'infant'</code><br>
            - <code>feet = 5</code>, return <code>'unknown'</code><br>
          `
        ],
        "key": '2KE4WAZX58'
    },
    '3': {
      "title": "Challenge Question: Prime Numbers",
      "description": "Do you know cryptography(密碼學)🔐 leverage large prime numbers(質數)? Prime number is a natural number greater than 1 that has only 2 factors: 1 and itself<br>Complete the function <code>prime(max)</code> to return a list of prime number smaller or equal to <code>max</code>, where <code>3 <= max <= 100</code><br> Given that <code>max = 30</code>, the function should return <code>[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]</code>.",
      "packages": [],
      "sampleParam": [30],
      "functionName": "prime",
      "additionalFunctions": [],
      "test":[
"assert prime(30) == " + JSON.stringify(prime(30)).replace(/,/g, ', '),
"assert prime(50) == "+ JSON.stringify(prime(50)).replace(/,/g, ', '),
"assert prime(100) == "+ JSON.stringify(prime(100)).replace(/,/g, ', ')
      ],
      "skeleton": [
"def prime(max):",
"\tprime_list = []",
"\tfor num in range(2, max + 1):",
"\t\t# TODO: Complete the function to return a list of prime number smaller than max.",
"",
"\treturn prime_list",
"",
"print(prime(30))"
      ],
      "hints": [
        `
        1. How can you check if the number is prime or not? Iterate the number from 2 until the number itself<br>
        2. If it is a prime number, append the number to the list.
        3. There are 3 test cases in this question:<br>
          - <code>max = 30</code>, return <code>[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]</code><br>
          - <code>max = 50</code>, return <code>[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]</code><br>
          - <code>max = 100</code>, return <code>[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]</code><br>  
        <br>
        `
      ],
      "key": 'XNITLR1FTE'
    },
    '4': {
      "title": "Base Conversion I",
      "description": `Do you know numbers can be represent by different bases (進制)? Some of the common bases we used in mathematics are 2, 10 and 16<br> Complete the function <code>hex_to_dec</code> to convert a decimal number to hexadecimal number<br> Given that <code>hex = '0xa'</code>, the function should return <code>'0xa'</code>, where <code>10</code> represents that the computer is displaying the value in hexadecimal bases`,
      "packages": [],
      "sampleParam": ['0xa'],
      "functionName": "hex_to_dec",
      "additionalFunctions": [],
      "test":[
"assert hex_to_dec('0x3') == 3",
"assert hex_to_dec('0x10') == 16",
"assert hex_to_dec('0xff') == 255"
      ],
      "skeleton": [
"def hex_to_dec(value):",
"\t#TODO: Complete the function to convert a decimal number to hexadecimal number.",
"",
"print(hex_to_dec('0xa'))"
      ],
      "hints": [
        `
        1. In python, there are a build-in function <code>hex()</code><br> which converts number from decimal to hexadecimal.<br>
        2. There are 3 test cases in this question:<br>
          - <code>hex = '0x3'</code>, return <code>3</code><br>
          - <code>hex = '0x10'</code>, return <code>16</code><br>
          - <code>hex = '0xff'</code>, return <code>255</code><br>
        `
      ],
      "key": "WPFE7XPK9V",
    },
    '5': {    
        "title": "Base Conversion II",
        "description": `Besides of base 2, 10 and 16 in mathematic, computer also use different encoding scheme to represent values, such as ASCII(to represent english and non-printable characters) and base64(widely use for sending email attachments)<br>Complete the function <code>b64_to_ascii</code> to convert base64 encoded string to text (represented in utf-8)<br>Given that <code>text = 'SW5mb3JtYXRpb24gRW5naW5lZXJpbmc'</code>, the function should return <code>Information Engineering</code>`,
        "packages": ["base64"],
        "sampleParam": ["SW5mb3JtYXRpb24gRW5naW5lZXJpbmc"],
        "functionName": "b64_to_ascii",
        "additionalFunctions": [],
        "test":[
  "assert b64_to_ascii('QmFzZTY0IGlzIGNvbW1vbg==') == 'Base64 is common'",
  "assert b64_to_ascii('QVNDSUkgaXMgYW4gZW5jb2Rpbmcgc2NoZW1l') == 'ASCII is an encoding scheme'",
  "assert b64_to_ascii('SGVsbG8gV29ybGQ=') == 'Hello World'"
        ],
        "skeleton": [
  "import base64",
  "def b64_to_ascii(value):",
  "\t#TODO: Complete the function to convert base64 encoded string to text.",
  "",
  'print(b64_to_ascii("SW5mb3JtYXRpb24gRW5naW5lZXJpbmc="))'
        ],
        "hints": [
          `To convert a ASCII string to base64, you may use <code>base64.b64encode(value)</code> to convert the base64 string to text. Note that the question is requesting a string, not a byte array as the output, so you may need to use decode function to convert it to text<br>
          There are 3 test cases in this question:<br>
            - <code>text = 'QmFzZTY0IGlzIGNvbW1vbg=='</code>, return <code>'Base64 is common'</code><br>
            - <code>text = 'QVNDSUkgaXMgYW4gZW5jb2Rpbmcgc2NoZW1l'</code>, return <code>'SW5mb3JtYXRpb24gRW5naW5lZXJpbmc'</code><br>
            - <code>text = 'SGVsbG8gV29ybGQ='</code>, return <code>'Hello World'</code><br>
          `
        ],
        "key": "I3J9XDQTMD",
    },
    '6': {
      "title": "Challenge Question: Base Conversion IV",
      "description": `Test your understanding on base conversion! Complete the function <code>base39_to_ascii</code> to convert base39 encoded string to ASCII<br>Given that <code>value = '¼JRGBSOI0F9AJXJHC3D6MSTBM29VI6ZTHDYSV0E¼5HVF0YLKHOC2HBH'</code>, the function should return <code>'Congratulations for figuring it out!'</code>`,
      "packages": [],
      "sampleParam": ['¼JRGBSOI0F9AJXJHC3D6MSTBM29VI6ZTHDYSV0E¼5HVF0YLKHOC2HBH'],
      "functionName": "b39_to_ascii",
      "additionalFunctions": [
`MAP = "0¼½¾123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"`
      ],
      "test":[
'assert b39_to_ascii("¼TOR1K9¾PHMRS4W8FKL8Y95KH0LRD2QL96½GPQMEQ¾ITSDM33KFG¼½J9ESYU2TPQ6T365KX¼QCZNY04ARLO6YF4KD6½O9QBRFJ60QFS6VR8T9¼½6KXOOJ¼¼DDZGKE1JDP½DJRQ4Y9HUE8J3SHFDZSC525TOU26¼XWQRC") == "The IE department was established in 1989 as the first IE department and remains one of a kind in Hong Kong."',
'assert b39_to_ascii("¾DCIVPOH9J8SE½R4U¾NCJ5T5U¾GIC6733MGNDZPXZNU¼ZP9UT4L7GPV7HZG3ZE¾C6½MJWOOFMRF¾IBCLB2ZY0VLP9LPYD½OX¾NCZILNST84½NIZQPRFLHDJX2KTBZQ") == "We have a world class faculty whose research sits at the intersection of EE and CS."'

      ],
      "skeleton": [
`MAP = "0¼½¾123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def b39_to_ascii(string):
    #TODO1: Convert base39 encoded string to decimal value
  
    #TODO2: Convert decimal value to ASCII

    return value

encoded = "7C2WAHUH10D57183FN5I55AS77¼G0B8NYJCC7¾64NO296CTGW¼D52J1A4"

n = b39_to_ascii(encoded)
print(n)`
      ],
      "hints": [],
      "key": "QP7D6OA9ID",
    },
    '7': {
      "title": "Caesar Cipher",
      "description": "Caesar Cipher is a classic substitutional cipher.<br> Given a key (integer) and a message, return the decrypted message.<br> For example, if the key is 13 and the message is <code>URYYBJBEYQ</code>, the decrypted message is <code>HELLOWORLD</code>",
      "packages": [],
      "sampleParam": ["HELLOWORLD", 13],
      "functionName": "decrypt",
      "additionalFunctions": [],
      "test":[
"assert decrypt(5, 'WFSITRUTXYJCY') == 'RANDOMPOSTEXT'",
"assert decrypt(-6, 'LUHXIGHYANYMN') == 'RANDOMNEGTEST'",
"assert decrypt(30, 'SZIVTSW') == 'OVERPOS'",
"assert decrypt(-41, 'ZGPCYPR') == 'OVERNEG'",
"assert decrypt(0, 'NOCHANGES') == 'NOCHANGES'"
      ],
      "skeleton": [
'MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"',
"def decrypt(key, message):",
"\t#TODO Complete the function to decrypt Caesar Cipher with given key",
'\tdecrypted = ""',
"",
"\treturn decrypted",
"",
'print(decrypt(13, "URYYBJBEYQ"))'
      ],
      "hints": [
`
1. How many characters are in the alphabet?<br>
2. How to calculate the original index? It can be calculated by using <code>original_index = (current_index - key)</code><br>
3. How should you handle numbers greater than 26? Modulus arithmetic would help<br>
4. There are 5 test cases in this question:<br>
- <code>key = 5</code> and <code>message = 'WFSITRUTXYJCY'</code>, return <code>'RANDOMPOSTEXT'</code><br>
- <code>key = -6</code> and <code>message = 'LUHXIGHYANYMN'</code>, return <code>'RANDOMNEGTEST'</code><br>
- <code>key = 30</code> and <code>message = 'SZIVTSW'</code>, return <code>'OVERPOS'</code><br>
- <code>key = -41</code> and <code>message = 'ZGPCYPR'</code>, return <code>'OVERNEG'</code><br>
- <code>key = 0</code> and <code>message = 'NOCHANGES'</code>, return <code>'NOCHANGES'</code><br>`
      ],
      "key": "8TNWYNPD3K",
    },
    '8': {
      "title": "Challenge Question:Breaking PRNG - LCG",
      "description": "Cryptography relies on PRNG (pseudorandom number generator) to generate random keys, initialize vectors and nonce. However, not all PRNG are cryptographically secure, some random numbers generated by weak algorithm are predicable. The LCG PRNG is one of the most popular PRNG, as it is easy to understand and implement. However, it is also known to be cryptographically insecure.<br> Complete the function <code>lcg_attack<(sequence, modulus)</code> to guess what is the next random number based on the given sequence. </br> The LCG PRNG are defined by the formula: <code>X<sub>n+1</sub> = (multiplier * X<sub>n</sub> + increment) mod modulus</p></code>Given that the modulus used in the algorithm is always <code>2<sup>31</sup></code> and the seed value is <code>54294923</code>, the next random number should be <code>1024119730</code><br>",
      "packages": [],
      "sampleParam": [],
      "functionName": "lcg_attack",
      "additionalFunctions":[
`
def lcg(seed, no_of_round=10, multiplier=1103515245, increment=12345, modulus=2**31):
  rand_list = []
  for i in range(0, no_of_round):
    seed = (multiplier * seed + increment) % modulus
    rand_list.append(seed)
  return rand_list

def egcd(a, b):
  if a == 0:
      return (b, 0, 1)
  else:
      g, x, y = egcd(b % a, a)
      return (g, y - (b // a) * x, x)

def modinv(b, n):
  g, x, _ = egcd(b, n)
  if g == 1:
      return x % n
`
      ],
      "test":[
"assert lcg_attack(lcg(123, 6), 2**31) == 1363953250",
"assert lcg_attack(lcg(1289736, 6), 2**31) == 2384163",
"assert lcg_attack(lcg(9823468, 6), 2**31) == 598695831"
      ],
      "skeleton": [
`# Function to generate a list of random numbers based on LCG PRNG
def lcg(seed, no_of_round=10, multiplier=1103515245, increment=12345, modulus=2**31):
	rand_list = []
	for i in range(0, no_of_round):
		seed = (multiplier * seed + increment) % modulus
		rand_list.append(seed)
	return rand_list

# Implementation of extended euclid's algorithm
def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, x, y = egcd(b % a, a)
        return (g, y - (b // a) * x, x)

# Function to calculate modular multiplicative inverse
def modinv(b, n):
    g, x, _ = egcd(b, n)
    if g == 1:
        return x % n

def lcg_attack(sequence, modulus):
    # TODO: find the multiplier and increment value, then calculate the next random number

    return # Next random number

prng = lcg(54294923)
random = prng[0:6]

print("The 7-th random number is: ", lcg_attack(random, 2**31))
print("The actual 7-th random number is: ", prng[6])
`
      ],
      "hints": [
        `1. From the LCG formula, <code>X<sub>n</sub></code> represent the current value, while <code>X<sub>n+1</sub></code> is the next value. <code>X<sub>n</sub></code> would be the variable in the formula, while <code>multiplier</code>, <code>increment</code>, <code>modulus</code> are constants throughout the code<br>
        2. By finding out the <code>multiplier</code>, <code>increment</code>, <code>modulus</code>, we will be able to predict the next random number.<br>
        3. Create 2 formulas:<br>
        &emsp;<code>X<sub>1</sub> = (multiplier * X<sub>0</sub> + increment) % modulus</code> -- (1)<br>
        &emsp;<code>X<sub>2</sub> = (multiplier * X<sub>1</sub> + increment) % modulus</code> -- (2)<br>
        &emsp;Would (2)-(1) help? Can you find <code>multiplier</code> and <code>increment</code> accordingly?<br>
        4. The function <code>modinv(b, n)</code>could help you to get rid of the mod arithmetic<br>
        5. There are 3 test cases in this question:<br>
        - <code>seed = 123</code></code>, return <code>1363953250</code><br>
        - <code>seed = 1289736</code></code>, return <code>2384163</code><br>
        - <code>seed = 9823468</code></code>, return <code>598695831</code><br>
        <br>
        This link might help: https://tailcall.net/posts/cracking-rngs-lcgs/
        `
      ],
      "key": "VZMYVS0LYW",
    },
    '9': {
      "title": "AES Decryption",
      "description": "Python supports third-party libraries. By using simple command <code>pip install</code>, we can install Python packages from the Python Package Index (PyPI) easily. We will be using 'cryptography' package to decrypt a ciphertext here.<br> Given the key and IV, decrypt the ciphertext using AES CBC mode",
      "packages": ["cryptography"],
      "sampleParam": [],
      "functionName": "decrypt",
      "additionalFunctions": [
`
import os
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.padding import PKCS7

def encrypt(pt, key, iv):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    padder = PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(bytes(pt, 'utf-8')) + padder.finalize()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    encodedciphertext = base64.b64encode(ciphertext)
    return encodedciphertext

key = os.urandom(32)
iv = os.urandom(16)
`
      ],
      "test":[
"assert decrypt(encrypt('Information Engineering', key, iv), key, iv) == b'Information Engineering'",
      ],
      "skeleton": [
`import os
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.padding import PKCS7

def decrypt(ct, key, iv):
    # TODO: complete the decrypt function and return the plaintext in bytes

    return plaintext

def encrypt(pt, key, iv):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    padder = PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(bytes(pt, 'utf-8')) + padder.finalize()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    encodedciphertext = base64.b64encode(ciphertext)
    return encodedciphertext


key = os.urandom(32)
iv = os.urandom(16)
ct = encrypt("test", key, iv)
pt = decrypt(ct, key, iv)
print(pt)

`
      ],
      "hints": [
        `
          1. The ciphertext are provided in base64 format. To use the ciphertext properly, decode the ciphertext first<br>
          2. The data is padded with PKCS7, unpad it before proceeding to decryption<br>
          3. Take a look on the encrypt function, it should help you on completing the task<br>
          4. Reading the documentation page would help: https://cryptography.io/en/latest/hazmat/primitives/symmetric-encryption/
        `
      ],
      "key": "NMF0T6CRKE"
    },
    '10': {
      "title": "Base conversion III",
      "description": "Numbers can also encoded with different alphabets.<br> Complete the function bin_to_dec to convert a binary value to a decimal number. Where the binary encodes with 🌑 🌕 to represent a value.<br>Given that <code>value = 🌕🌕🌑🌑🌕🌑🌑</code>, the function should return <code>100</code>",
      "packages": [],
      "sampleParam": ["🌕🌕🌑🌑🌕🌑🌑"],
      "functionName": "bin_to_dec",
      "additionalFunctions": [],
      "test":[
"assert bin_to_dec('🌕🌕🌕🌕🌕🌑🌕🌑🌑🌑') == 1000",
"assert bin_to_dec('🌕🌕🌑🌑🌕🌕🌕') == 103",
"assert bin_to_dec('🌕🌕🌕🌑🌕🌕🌑🌕') == 237",
      ],
      "skeleton": [
`MAP = "🌑🌕"

def bin_to_dec(value):
    
    return value

decoded = bin_to_dec("🌕🌕🌑🌑🌕🌑🌑")
print(decoded)
`
      
      ],
      "hints": [
`This question is similar to what you need to do to convert a binary number to a decimal number. But an additional step is needed: map the alphabet value to the binary value.<br>
There are 3 test cases in this question:<br>
- <code>value = 🌕🌕🌕🌕🌕🌑🌕🌑🌑🌑</code>, return <code>1000</code><br>
- <code>value = 🌕🌕🌑🌑🌕🌕🌕</code>, return <code>103</code><br>
- <code>value = 🌕🌕🌕🌑🌕🌕🌑🌕</code>, return <code>237</code><br>
`        
      ],
      "key": "9EWBYSMUZ3",
    }
}