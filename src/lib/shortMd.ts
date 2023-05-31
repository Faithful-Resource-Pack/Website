import { marked } from 'marked';
//@ts-ignore
import TextRenderer from 'kramed-text-renderer';
import { sanitize } from 'isomorphic-dompurify';

const parseMd = function (md: string, inline?: boolean) {
    if (inline) return sanitize(marked.parseInline(md, {breaks: true}))
    return sanitize(marked.parse(md))
}

const shortMd = function (md: string, length = 157) {
    let renderer = TextRenderer()
    renderer.heading = function () { return '' }
    renderer.listitem = function (text: string) { return `- ${text}\n` }
    renderer.text = function (t: string) { return t }
    renderer.br = function () { return ' ' }
    renderer.hr = function () { return ' ' }

    const desc_txt = sanitize(marked.parse(md, {
        renderer
    })).replace(/\n+ ?/g, ' ').trim()

    let short = `${desc_txt.split(' ').reduce(([acc, done]: [string, boolean], cur: string): [string, boolean] => {
        if (!done && acc.length + cur.length < length) acc += ' ' + cur
        else done = true
        return [acc, done]
    }, ['', false])[0]}`.substring(1) // remove first space

    if (short.length < desc_txt.length && short[short.length - 1] != '.')
        short += '...'

    return short
}

function countOffset(line: string): number {
    let count = 0
    while (/\s|-/.test(line[count])) {
        count++
    }
    return count
}

const START_LINE = /^(\s|-)+/

type ListItem = string | ListItem[]

function parseMarkdownList(markdownList: string): ListItem[] {
    const lines = markdownList.split(/\r?\n/)

    //! LEAVE THE SPACES for subitems

    const indentedLines = lines.map((l) => [countOffset(l), l] as [number, string]);
    const minIndent = indentedLines[0][0]
    const groupedLines = indentedLines.map((i) => i[0] === minIndent ? [i[1],] : [, i[1]])
        .reduce((acc, cur) => {
            //  is good if cur[0] !== undefined
            if (acc.length === 0) {
                if (cur[0] !== undefined) {
                    acc.push(cur[0].replace(START_LINE, ''))
                } else {
                    acc.push([])
                }
            } else {
                if (cur[0] !== undefined) {
                    acc.push(cur[0].replace(START_LINE, ''))
                } else {
                    // not good, sublist
                    let last = acc[acc.length - 1]
                    if (Array.isArray(last)) {
                        last.push(cur[1] as string)
                    } else {
                        acc.push([cur[1] as string])
                    }
                }
            }

            return acc
        }, [] as (string | string[])[])
        .map((e) => Array.isArray(e) ? parseMarkdownList(e.join('\n')) : e)

    return groupedLines;
}

export type { ListItem };
export { shortMd, parseMd, parseMarkdownList as parseMdList };
export default shortMd;