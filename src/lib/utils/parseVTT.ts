export interface Caption {
  start: number;
  end: number;
  text: string;
}

export const parseVTT = (vttText: string) => {
  const captions: Caption[] = [];
  const lines = vttText.trim().split(/\n/);
  let i = 0;

  while (i < lines.length) {
    const timeMatch = lines[i].match(
      /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/
    );

    if (timeMatch) {
      const start = toSeconds(timeMatch[1]);
      const end = toSeconds(timeMatch[2]);
      const textLines: string[] = [];

      i++; // Move to the line after timestamp

      while (i < lines.length && lines[i].trim() !== "") {
        textLines.push(lines[i].trim());
        i++;
      }

      const text = textLines.join("\n");
      if (text) {
        captions.push({ start, end, text });
      }
    }

    i++; // Move to next line if not time or after reading caption
  }

  return captions;
};

const toSeconds = (time: string) => {
  const [h, m, s] = time.split(":");
  const [sec, ms] = s.split(".");
  return +h * 3600 + +m * 60 + +sec + +ms / 1000;
};
