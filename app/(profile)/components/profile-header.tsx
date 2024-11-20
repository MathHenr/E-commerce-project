import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAuth } from "@/hook/useAuth"
import { Pencil, Save } from "lucide-react"

import { Username } from "./username"
import { Button } from "@/components/ui/button"

interface ProfileHeaderProps {
    disabled: boolean;
    setDisabled: Dispatch<SetStateAction<boolean>>
    save?: () => Promise<boolean>;
}

export const ProfileHeader = ({ 
    save,
    setDisabled,
    disabled,
}: ProfileHeaderProps) => {
    const { user } = useAuth()
    const [edit, setEdit] = useState(false)
    
    function handleEdit () {
        return disabled ? setDisabled(false) : setDisabled(true)
    }
    
    useEffect(() => {}, [disabled])
    
    return (
        <>
            {/* profile header */}
            <div className="w-full flex items-center justify-between">
                <Username firstName={user?.firstName} lastName={user?.lastName} />
                
                {edit ? (
                    <Button
                        variant="change"
                        onClick={() => {
                            setEdit(false)
                            save!()
                        }}
                    >
                        <Save />
                        Save changes
                    </Button>
                ) : (
                    <Button
                        variant="change"
                        onClick={() => {
                            handleEdit()
                            setEdit(true)
                        }}
                    >
                        <Pencil />
                        Edit
                    </Button>
                )}
            </div>
        </>
    )
}