import re
import sys
import json
import os

# Usage: python scripts/replace_tokens.py replacements.json input.md output.md

# Get the root directory name (where the script is run)
root_dir_name = os.path.basename(os.getcwd())
replacements["ROOT_DIR"] = root_dir_name

def main():
    if len(sys.argv) != 4:
        print("Usage: python scripts/replace_tokens.py replacements.json input.md output.md")
        sys.exit(1)

    replacements_file = sys.argv[1]
    input_file = sys.argv[2]
    output_file = sys.argv[3]

    # Load replacements from JSON file
    with open(replacements_file, "r") as f:
        replacements = json.load(f)

    # Read the input file
    with open(input_file, "r") as f:
        content = f.read()

    # Replace all {{VARIABLE}} tokens
    for key, value in replacements.items():
        content = re.sub(r"\{\{" + re.escape(key) + r"\}\}", value, content)

    # Write the updated content to the output file
    with open(output_file, "w") as f:
        f.write(content)

    print(f"Replaced tokens and wrote output to {output_file}")

if __name__ == "__main__":
    main()
