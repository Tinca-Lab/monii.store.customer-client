import {marked} from 'marked';
// import * as DOMPurify from 'dompurify';


export const useMarked = () => {

    const onParse = (markdown: string) => {
        return marked.parse(markdown);
    };

    return {
        onParse,
    };
}
