type Props = {
    children: React.ReactNode;
}

export default function HomeLayout ({ children }: Props) {
    return (
        <>
            <main>
                { children }
            </main>
        </>
    )
}