<script lang="ts">
    import DOMPurify from 'isomorphic-dompurify';
    import { t } from '$lib/translations';

    export let path: string;
    export let tag: string = '';

    export let slots: Record<string, string> = {};

    const tags = tag.length > 0 ? [`<${tag}>`, `</${tag}>`] : ['',''];

    const raw = $t(path);
    let inner = String(raw);
    Object.entries(slots).forEach(([key, val]) => {
        let re = new RegExp(`{${key}}([^{]+){\/[a-z]+}`, 'g');
        inner = inner.replace(re, val)
    });

    const sanitized = DOMPurify.sanitize(inner);
    
    let final = `${tags[0]}${sanitized}${tags[1]}`;
</script>

{@html final}