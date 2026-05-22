import { toJpeg } from 'html-to-image';

export async function DownloadElement(element: HTMLDivElement, page: string) {
    toJpeg(element, { backgroundColor: "#e1d5ff", cacheBust: true })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = page == 'storage' ? 'lista-compras.png' : 'perfil-filho.png'
            link.href = dataUrl
            link.click()

        })
        .catch((e) => {
            console.log(e)
        })
}

export default { DownloadElement }