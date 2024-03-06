import { IconMail, IconNotes, IconChevronRight, IconUser } from "@tabler/icons-react";

export const navlinks = [
    {
        icon: IconMail,
        label: 'Все отчёты',
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />
    },
    {
        icon: IconUser,
        label: 'Мои отчеты',
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />
    },
    {
        icon: IconNotes,
        label: 'Черновики',
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />
    },
];