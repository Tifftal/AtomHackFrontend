import TextEditor from '../../widgets/TextEditor'
import { ActionIcon, Button } from '@mantine/core';
import { useState } from 'react';
import { FileButton, Group } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';
import File from '../../entities/File';
import './index.scss'

const DraftReport = () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <div className='draft-report'>
            <TextEditor />

            {files.length > 0 && (
                <div className='files'>
                    {files.map((file, index) => (
                        <File key={index} name={file.name} isDraft={true} type={file.type} />
                    ))}
                </div>
            )}

            <div className='footer-report'>
                <div className='group-btn'>
                    <Button variant="filled" color="cyan">Отправить</Button>
                    <Group justify="center">
                        <FileButton onChange={(newFiles) => setFiles((prevFiles) => [...prevFiles, ...newFiles])} multiple>
                            {(props) => <ActionIcon variant="white" color="rgba(0, 0, 0, 1)" size="lg" aria-label="Settings" {...props}>
                                <IconPaperclip style={{ width: '80%', height: '80%' }} stroke={1.5} />
                            </ActionIcon>}
                        </FileButton>
                    </Group>
                </div>
            </div>
        </div>
    )
}

export default DraftReport;