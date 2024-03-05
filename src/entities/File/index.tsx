import { Props } from './types';
import TruncateText from '../TruncateText';
import pdf from '../../assets/icons/file-type-pdf.png'
import png from '../../assets/icons/file-type-png.png'
import jpg from '../../assets/icons/file-type-jpg.png'
import file from '../../assets/icons/file.png'
import xls from '../../assets/icons/file-type-xls.png'
import doc from '../../assets/icons/file-type-doc.png'
import close from '../../assets/icons/x.png'
import './index.scss'

const File: React.FC<Props> = ({ name, isDraft, type }) => {
    return (

        <div className='file'>
            {
                isDraft ?
                    <button><img src={close} /></button>
                    : null
            }

            {
                type === 'image/png' ? <img src={png} /> : type === ('image/jpeg' || 'image/jpg') ? <img src={jpg} /> : type === 'application/pdf' ? <img src={pdf} /> : type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? <img src={doc} /> :
                    type === 'application/msword' ? <img src={doc} /> : type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? <img src={xls} /> : type === 'application/vnd.ms-excel' ? <img src={xls} /> : <img src={file} />
            }
            <TruncateText text={name} maxLength={9} />
        </div>
    )
}

export default File;