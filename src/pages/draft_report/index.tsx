import TextEditor from '../../widgets/text_editor'
import './index.scss'
import { Button } from '@mantine/core';

const DraftReport = () => {
    return (
        <div className='draft-report'>
            <TextEditor />
            <div className='group-btn'>
                <Button variant="filled" color="gray">Сохранить черновик</Button>
                <Button variant="filled" color="cyan">Отправить</Button>
            </div>
        </div>
    )
}

export default DraftReport;