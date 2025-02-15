import subprocess

def log_tmp_contents(label, directory):
    print(f"{label}, contents of {directory}:")
    subprocess.run(["ls", "-lh", directory])
