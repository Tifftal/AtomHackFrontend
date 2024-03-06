import { ActionIcon, Button, FileButton, Group } from "@mantine/core"
import { IconPaperclip } from "@tabler/icons-react"
import { Props } from "./types"

export const FileList : React.FC<Props> = ({
    setFiles,
}) => {
    return (
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
    )
}