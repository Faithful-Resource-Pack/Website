import { marked } from 'marked';
//@ts-ignore
import TextRenderer from 'kramed-text-renderer';
import DOMPurify from 'isomorphic-dompurify';

const parseMd = function(md: string) {
    return DOMPurify.sanitize(marked.parse(md))
}

const shortMd = function(md: string, length=157) {
    let renderer = TextRenderer()
    renderer.heading = function() { return '' }
    renderer.listitem = function(text: string) { return `- ${text}\n` }
    renderer.text = function(t: string) { return t }
    renderer.br = function() { return ' ' }
    renderer.hr = function() { return ' ' }

    const desc_txt = DOMPurify.sanitize(marked.parse(md, {
        renderer
    })).replace(/\n+ ?/g, ' ').trim()

    let short = `${desc_txt.split(' ').reduce(([acc, done]: [string, boolean], cur: string): [string, boolean] => {
        if(!done && acc.length + cur.length < length) acc += ' ' + cur
        else done = true
        return [acc, done]
    }, ['', false])[0]}`.substring(1) // remove first space

    if(short.length < desc_txt.length && short[short.length-1] != '.')
        short += '...'

    return short
}

export { shortMd, parseMd };
export default shortMd;