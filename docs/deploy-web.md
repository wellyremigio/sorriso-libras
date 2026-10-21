# Publicação web no Render

No Static Site do frontend, use:

- Build Command: `npm ci && npx expo export --platform web`
- Publish Directory: `dist`

Em **Redirects/Rewrites**, adicione:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | `Rewrite` |

Essa regra permite acessar ou atualizar URLs internas, como `/crianca/metas`.
Ela precisa ser configurada no serviço existente do Render; este arquivo não
altera o painel automaticamente.

## Verificação após o deploy

1. Abra a página inicial e entre no menu da criança.
2. Abra as metas e confira a URL `/crianca/metas`.
3. Use Voltar no navegador: deve abrir `/crianca`.
4. Use Avançar: deve abrir as metas novamente.
5. Atualize a página de metas e abra essa URL em outra aba: não deve ocorrer 404.

As aulas infantis recarregam os vídeos pela API ao abrir uma URL diretamente.
Aulas de responsáveis sem a lista de conteúdos retornam ao menu correspondente.
Conquistas sem dados retornam à galeria. Dados temporários de vídeos e figurinhas
não são incluídos na URL.

A integração de URLs é ativada somente na web. Não é necessário gerar outro APK
para publicar essa correção no site.
