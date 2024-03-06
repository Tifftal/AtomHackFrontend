import TextEditor from '../../feature/TextEditor'
import { ActionIcon, Button, Dialog, TextInput } from '@mantine/core';
import { useState } from 'react';
import { FileButton, Group } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';
import File from '../../entities/File';
import './index.scss'

const DraftReport = () => {
    const [files, setFiles] = useState<File[]>([]);

    const DeleteFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    }

    return (
        <Dialog
            className='draft-report'
            opened={true}
            withCloseButton
        >
            <TextInput
                label="От кого"
                withAsterisk
                placeholder="Введите ФИО"
            />
            <TextEditor />
            {files.length > 0 && (
                <div className='files'>
                    {files.map((file, index) => (
                        <File key={index} index={index} name={file.name} isDraft={true} type={file.type} DeleteFile={DeleteFile} />
                    ))}
                </div>
            )}
            <div className='footer-report'>
                <div className='group-btn'>
                    <Button variant="filled" color="violet">Отправить</Button>
                    <Group justify="center">
                        <FileButton onChange={(newFiles) => setFiles((prevFiles) => [...prevFiles, ...newFiles])} multiple>
                            {(props) => <ActionIcon variant="transparent" color="rgba(0, 0, 0, 1)" size="lg" aria-label="Settings" {...props}>
                                <IconPaperclip style={{ width: '80%', height: '80%' }} stroke={1.5} />
                            </ActionIcon>}
                        </FileButton>
                    </Group>
                </div>
            </div>
        </Dialog>
    )
}

export default DraftReport;