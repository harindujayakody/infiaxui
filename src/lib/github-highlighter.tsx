import React from "react"

/**
 * GitHub Syntax Highlighting Tokenizer
 * Implements GitHub Dark & GitHub Light theme colors:
 * - Keywords: #ff7b72 (Dark) / #cf222e (Light) - coral/red
 * - Strings: #a5d6ff (Dark) / #0a3069 (Light) - light blue
 * - Tags: #7ee787 (Dark) / #116329 (Light) - green
 * - Functions: #d2a8ff (Dark) / #8250df (Light) - purple
 * - Types: #ffa657 (Dark) / #953800 (Light) - orange
 * - Attributes/Props: #79c0ff (Dark) / #0550ae (Light) - sky blue
 * - Numbers/Booleans: #79c0ff (Dark) / #0550ae (Light) - blue
 * - Comments: #8b949e (Dark) / #6e7781 (Light) - gray italic
 * - Punctuation/Plain: #e6edf3 (Dark) / #24292f (Light)
 */

export function highlightGithubLine(line: string): React.ReactNode {
  if (!line.trim()) return <span>&nbsp;</span>

  // 1. Comments
  const trimmed = line.trim()
  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("{/*")
  ) {
    return <span className="text-[#8b949e] dark:text-[#8b949e] text-[#6e7781] italic">{line}</span>
  }

  // Tokenize regex for GitHub theme
  const tokenRegex =
    /(\/\*[\s\S]*?\*\/|\/\/.*|\{\/\*[\s\S]*?\*\/\}|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z0-9_.-]+|\b(?:import|export|from|default|function|return|const|let|var|if|else|switch|case|break|try|catch|finally|throw|new|typeof|instanceof|async|await|yield|class|extends|interface|type|as|in|of)\b|\b(?:string|number|boolean|any|void|null|undefined|ReactNode|React|HTMLElement|HTMLButtonElement|HTMLDivElement|HTMLAnchorElement|Record|Array|Promise|Set|Map|Props)\b|\b(?:true|false)\b|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()|\b[a-zA-Z_$][a-zA-Z0-9_$-]*(?=\s*=)|[{}\[\](),;:.=><!&|?+\-*%/^~]+)/g

  const tokens: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(line)) !== null) {
    // Add text between matches
    if (match.index > lastIndex) {
      tokens.push(
        <span key={`text-${lastIndex}`} className="text-[#e6edf3] dark:text-[#e6edf3] text-[#24292f]">
          {line.slice(lastIndex, match.index)}
        </span>
      )
    }

    const token = match[0]
    const key = `tok-${match.index}`

    // Comment
    if (token.startsWith("//") || token.startsWith("/*") || token.startsWith("{/*")) {
      tokens.push(
        <span key={key} className="text-[#8b949e] dark:text-[#8b949e] text-[#6e7781] italic">
          {token}
        </span>
      )
    }
    // Strings
    else if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      tokens.push(
        <span key={key} className="text-[#a5d6ff] dark:text-[#a5d6ff] text-[#0a3069]">
          {token}
        </span>
      )
    }
    // JSX / HTML Tags: <div, </span>, <Button, etc.
    else if (/^<\/?[A-Za-z0-9_.-]+$/.test(token)) {
      const isClosing = token.startsWith("</")
      const tagPrefix = isClosing ? "</" : "<"
      const tagName = token.slice(tagPrefix.length)

      tokens.push(
        <span key={key}>
          <span className="text-[#8b949e] dark:text-[#8b949e] text-[#57606a]">{tagPrefix}</span>
          <span className="text-[#7ee787] dark:text-[#7ee787] text-[#116329] font-medium">{tagName}</span>
        </span>
      )
    }
    // Keywords
    else if (
      /^(?:import|export|from|default|function|return|const|let|var|if|else|switch|case|break|try|catch|finally|throw|new|typeof|instanceof|async|await|yield|class|extends|interface|type|as|in|of)$/.test(
        token
      )
    ) {
      tokens.push(
        <span key={key} className="text-[#ff7b72] dark:text-[#ff7b72] text-[#cf222e] font-medium">
          {token}
        </span>
      )
    }
    // Types
    else if (
      /^(?:string|number|boolean|any|void|null|undefined|ReactNode|React|HTMLElement|HTMLButtonElement|HTMLDivElement|HTMLAnchorElement|Record|Array|Promise|Set|Map|Props)$/.test(
        token
      )
    ) {
      tokens.push(
        <span key={key} className="text-[#ffa657] dark:text-[#ffa657] text-[#953800] font-medium">
          {token}
        </span>
      )
    }
    // Booleans & Numbers
    else if (/^(?:true|false|\d+(?:\.\d+)?)$/.test(token)) {
      tokens.push(
        <span key={key} className="text-[#79c0ff] dark:text-[#79c0ff] text-[#0550ae]">
          {token}
        </span>
      )
    }
    // Functions (followed by paren)
    else if (line.slice(match.index + token.length).trim().startsWith("(")) {
      tokens.push(
        <span key={key} className="text-[#d2a8ff] dark:text-[#d2a8ff] text-[#8250df] font-medium">
          {token}
        </span>
      )
    }
    // Attributes / Props (followed by =)
    else if (line.slice(match.index + token.length).trim().startsWith("=")) {
      tokens.push(
        <span key={key} className="text-[#79c0ff] dark:text-[#79c0ff] text-[#0550ae]">
          {token}
        </span>
      )
    }
    // Punctuation & Operators
    else if (/^[{}()[\];,:.=><!&|?+\-*%/^~]+$/.test(token)) {
      tokens.push(
        <span key={key} className="text-[#e6edf3] dark:text-[#e6edf3] text-[#24292f]">
          {token}
        </span>
      )
    }
    // Default identifiers
    else {
      tokens.push(
        <span key={key} className="text-[#e6edf3] dark:text-[#e6edf3] text-[#24292f]">
          {token}
        </span>
      )
    }

    lastIndex = match.index + token.length
  }

  // Trailing text
  if (lastIndex < line.length) {
    tokens.push(
      <span key={`tail-${lastIndex}`} className="text-[#e6edf3] dark:text-[#e6edf3] text-[#24292f]">
        {line.slice(lastIndex)}
      </span>
    )
  }

  return <span>{tokens}</span>
}
