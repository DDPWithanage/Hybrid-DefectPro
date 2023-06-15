# -*- coding: utf-8 -*-
"""Final Software Defect Prediction.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1OC_mSvsWi_H033eQyoJoB9M1DohSx7EW
"""

import os
import re
import math
import csv
import numpy as np
from collections import defaultdict

# CALCULATE - lOCode, lOComment, lOBlank and lOCodeAndComment
def count_lines(filepath):
    with open(filepath, encoding='utf-8') as file:
        return len(file.readlines())


def count_comments(filepath):
    with open(filepath, encoding='utf-8') as file:
        file_contents = file.read()
        pattern = re.compile(r'(?<!")(?<!\')#.*$|/\*.*?\*/|//.*?$',
                             re.MULTILINE | re.DOTALL)
        matches = pattern.findall(file_contents)
        return len(matches)


def count_blank(filepath):
    with open(filepath, encoding='utf-8') as file:
        file_contents = file.read()
        pattern = re.compile(r'^(\s*#|^\s*$)', re.MULTILINE)
        matches = pattern.findall(file_contents)
        return len(matches)


def count_code_and_comment(filepath):
    with open(filepath, encoding='utf-8') as file:
        code_and_comment_lines = []
        in_comment_block = False
        for line in file:
            line = line.strip()
            if not line:
                continue
            if line.startswith('#') or line.startswith('"""') or line.startswith("'''"):
                code_and_comment_lines.append(line)
            elif in_comment_block:
                code_and_comment_lines.append(line)
                if line.endswith('"""') or line.endswith("'''"):
                    in_comment_block = False
            elif line.startswith('"""') or line.startswith("'''"):
                code_and_comment_lines.append(line)
                if not line.endswith('"""') and not line.endswith("'''"):
                    in_comment_block = True
            else:
                code_and_comment_lines.append(line)
        return len(code_and_comment_lines)


def calculate_halstead_metrics(directory):
    filepaths = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in ['node_modules']]
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.endswith('.ts') or file_path.endswith('.js'):
                filepaths.append(file_path)

    halstead_metrics = {
        'lOCode': 0,
        'lOComment': 0,
        'lOBlank': 0,
        'lOCodeAndComment': 0
    }

    for filepath in filepaths:
        lOCode = count_lines(filepath)
        halstead_metrics['lOCode'] += lOCode

        lOComment = count_comments(filepath)
        halstead_metrics['lOComment'] += lOComment

        lOBlank = count_blank(filepath)
        halstead_metrics['lOBlank'] += lOBlank

        lOCodeAndComment = count_code_and_comment(filepath)
        halstead_metrics['lOCodeAndComment'] += lOCodeAndComment

    return halstead_metrics





# CALCULATE - McCabe's Metrics
def calculate_mccabe_metrics(file_path):
    with open(file_path, 'r', encoding="utf8", errors="ignore") as f:
        contents = f.read()
        # Calculate the McCabe's line count
        mccabe_line_count = 0
        for line in contents.split('\n'):
            if re.search(r'if|elif|else|while|for|switch|case|break|return|and|or|not', line):
                mccabe_line_count += 1

        # Calculate the cyclomatic complexity
        keywords = ['if', 'elif', 'else', 'while', 'for', 'switch', 'case', 'break', 'return', 'and', 'or', 'not']
        complexity = len(re.findall(
            r'(?:(?<=\band\b)|(?<=\bor\b)|(?<=\bnot\b)|(?<=\bor\b)|(?<=\bif\b)|(?<=\belif\b)|(?<=\belse\b)|(?<=\bwhile\b)|(?<=\bfor\b)|(?<=\bswitch\b)|(?<=\bcase\b)|(?<=\bbreak\b)|(?<=\breturn\b))',
            contents))
        for keyword in keywords:
            complexity += contents.count(keyword)

        # Calculate the McCabe's essential complexity
        Vg = complexity + 1
        N = mccabe_line_count
        if N > 0:
            evg = Vg * (math.log(N) / math.log(2))
        else:
            evg = 0

        # Calculate McCabe's design complexity
        if N > 0:
            ivg = Vg / np.power(2, (N / 10))
        else:
            ivg = 0

        return mccabe_line_count, complexity, evg, ivg


def main(directory, metrics):
    total_mccabe_line_count = 0
    total_complexity = 0
    total_evg = 0
    total_ivg = 0
    total_files = 0

    # Recursively search for all TypeScript and JavaScript files in the given directory
    for root, _, files in os.walk(directory):
        # Skip node_modules directory
        if 'node_modules' in root:
            continue

        for file in files:
            if file.endswith('.ts') or file.endswith('.js'):
                file_path = os.path.join(root, file)
                mccabe_line_count, complexity, evg, ivg = calculate_mccabe_metrics(file_path)
                total_mccabe_line_count += mccabe_line_count
                total_complexity += complexity
                total_evg += evg
                total_ivg += ivg
                total_files += 1

    # Calculate the averages and update the metrics dictionary
    metrics['loc'] = total_mccabe_line_count
    metrics['v(g)'] = total_complexity
    metrics['ev(g)'] = total_evg
    metrics['iv(g)'] = total_ivg

    return metrics


# CALCULATE - Branch count of the project
def calculate_branch_count(root_dir, metrics):
    """
    Calculates the branch count of an Angular project.
    """
    branch_count = defaultdict(int)

    # Traverse the directory tree
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Ignore node_modules directory
        if 'node_modules' in dirnames:
            dirnames.remove('node_modules')

        # Check if file is TypeScript or JavaScript
        for filename in filenames:
            if filename.endswith('.ts') or filename.endswith('.js'):
                file_path = os.path.join(dirpath, filename)

                # Read file contents
                with open(file_path, 'r', encoding="utf8", errors="ignore") as f:
                    contents = f.read()

                # Find if statements, loops and ternary operators
                for match in re.findall(r'(if|for|while|&&|\|\|)\s*\(', contents):
                    # Increment branch count
                    branch_count[file_path] += 1

    # Calculate branch count percentage
    total_branch_count = sum(branch_count.values())

    # Update the metrics dictionary
    metrics['branchCount'] = total_branch_count

    return metrics

def rs_to_csv(sf_floder):
    # CALCULATE - Halstead Metrics
    # Define the file pattern to match
    file_pattern = re.compile(r'^.*\.(js|ts)$')

    # Initialize the operators and operands
    operators = {'+', '-', '*', '/', '%', '=', '==', '!=', '>', '<', '>=', '<=', '&&', '||', '!', '++', '--'}
    operands = set()

    # Get all the files in your project, excluding the node_modules directory
    root_dir = sf_floder
    if not os.path.isdir(root_dir):
        raise ValueError("Invalid directory: " + root_dir + " \nPlease provide a valid project path.")

    files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if 'node_modules' in dirpath.split(os.path.sep):
            continue
        for filename in filenames:
            if file_pattern.match(filename):
                files.append(os.path.join(dirpath, filename))

    # Process each file and extract the operands
    for file in files:
        try:
            # print("Processing file:", file)
            with open(file, 'r', encoding="utf8", errors="ignore") as f:
                contents = f.read()
                # extract all the variables and function names
                variables = re.findall(r'\b[a-zA-Z_][a-zA-Z0-9_]*\b', contents)
                functions = re.findall(r'def\s+([a-zA-Z_][a-zA-Z0-9_]*)\(', contents)
                # add the variables and function names to the operands set
                operands.update(variables + functions)

        except Exception as e:
            print("Error processing file:", file)
            print("Exception:", str(e))
            continue

    # Calculate the Halstead metrics
    n1 = len(operators)  # number of distinct operators
    n2 = len(operands)  # number of distinct operands
    N1 = 0  # total number of operators
    N2 = 0  # total number of operands

    # Process each file again and count the number of occurrences of each operator and operand
    for file in files:
        try:
            with open(file, 'r', encoding="utf8", errors="ignore") as f:
                contents = f.read()
                # count the number of occurrences of each operator
                for operator in operators:
                    N1 += contents.count(operator)
                # count the number of occurrences of each operand
                for operand in operands:
                    N2 += contents.count(operand)

        except Exception as e:
            print("Error processing file:", file)
            print("Exception:", str(e))
            continue

    # Calculate the metrics
    total_operators_and_operands = N1 + N2
    program_vocabulary = n1 + n2
    program_length = N1 + N2
    volume = program_length * math.log2(program_vocabulary)
    difficulty = (n1 / 2) * (N2 / n2)
    intelligence = volume / difficulty
    effort = difficulty * volume
    bugs = effort ** (2 / 3) / 3000
    halstead_b = bugs / volume
    time = (effort / 18) / 3600
    # Define the metrics and their corresponding values

    halstead_metrics = calculate_halstead_metrics(root_dir)
    metrics = {
        'loc': 0,
        'v(g)': 0,
        'ev(g)': 0,
        'iv(g)': 0,
        'n': total_operators_and_operands,
        'v': volume,
        'l': program_length,
        'd': difficulty,
        'i': intelligence,
        'e': effort,
        'b': halstead_b,
        't': time,
        'lOCode': halstead_metrics['lOCode'],
        'lOComment': halstead_metrics['lOComment'],
        'lOBlank': halstead_metrics['lOBlank'],
        'locCodeAndComment': halstead_metrics['lOCodeAndComment'],
        'uniq_Op': n1,
        'uniq_Opnd': n2,
        'total_Op': N1,
        'total_Opnd': N2,
        'branchCount': 0
    }

    # Get the project name from the root directory
    project_name = os.path.basename(root_dir)

    # Call the main function and pass in the metrics dictionary
    metrics = main(root_dir, metrics)

    # Calculate the branch count of the project
    metrics = calculate_branch_count(root_dir, metrics)

    # Write the results to a CSV file with the project name
    csv_file_path = f"{project_name}_metric_values.csv"
    file_exists = os.path.isfile(csv_file_path)

    with open(csv_file_path, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(list(metrics.keys()))
        writer.writerow(list(metrics.values()))

    if file_exists:
        print(f"{csv_file_path}_metric_values.csv", "File successfully updated")
    else:
        print(f"{project_name}_metric_values.csv", "File successfully created")

    return csv_file_path



