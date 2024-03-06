import { Props } from './types'
import pdf from '../../assets/icons/file-type-pdf.png'
import png from '../../assets/icons/file-type-png.png'
import jpg from '../../assets/icons/file-type-jpg.png'
import file from '../../assets/icons/file.png'
import xls from '../../assets/icons/file-type-xls.png'
import doc from '../../assets/icons/file-type-doc.png'
import close from '../../assets/icons/x.png'
import { TruncateText } from '../../utils/helpers'
import './index.scss'

const File: React.FC<Props> = ({ index, name, isDraft, type, DeleteFile }) => {
    const fileImg = (() => {
        switch (type) {
            case "image/png":
                return (
                    <img src={png} />
                );
            case "image/jpeg":
                return (
                    <img src={jpg} />
                );
            case "application/pdf":
                return (
                    <img src={pdf} />
                );
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return (
                    <img src={doc} />
                );
            case "application/msword":
                return (
                    <img src={doc} />
                );
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return (
                    <img src={xls} />
                );
            case "application/vnd.ms-excel":
                return (
                    <img src={xls} />
                );
            default:
                return (
                    <img src={file} />
                );
        }
    })()
    return (
        <div className='file'>
            {
                isDraft ?
                    <button onClick={() => { DeleteFile(index) }}><img src={close} /></button>
                    : null
            }
            {fileImg}
            <p>{TruncateText(name, 9)}</p>
        </div>
    )
}

export default File;