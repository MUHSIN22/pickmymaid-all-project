import React, { useCallback, useEffect } from 'react'

const Menu = ({ children, isOpen, setIsOpen }: { children: React.ReactNode, isOpen: boolean, setIsOpen: (value: boolean) => void }) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && !event.target.closest('.menu')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setIsOpen]);

    const renderButton = useCallback(() => {
        if (children?.[0]) {
            return React.cloneElement(children?.[0], { onClick: () => setIsOpen(!isOpen) })
        }
    }, [children, isOpen, setIsOpen])

    const renderList = useCallback(() => {
        if (children?.[1]) {
            return React.cloneElement(children?.[1], { onClose: () => setIsOpen(!isOpen) })
        }
    }, [children, isOpen, setIsOpen])

    return (
        <div className='menu relative!'>
            {renderButton()}
            {isOpen && renderList()}
        </div>
    )
}

const MenuButton = ({ onClick, children }: IButtonProps) => {
    return (
        <button
            className='flex! items-center! group gap-2! cursor-pointer! text-brand-primary-400! py-2! px-4! hover:bg-brand-primary-300! hover:text-white!  border! border-brand-primary-400! rounded-[10px_0_10px_0]! ' onClick={(e) => onClick(e)}>
            {children}
        </button>
    )
}

const MenuList = ({ children, onClose }: { children: React.ReactNode, onClose?: () => void }) => {
    return (
        <div className='absolute! top-full! mt-2! py-2! right-0! z-10! bg-white! border! rounded-md! border-text-black-900! min-w-[150px]!'>
            <ul onClick={(e) => {
                onClose?.()
            }}>
                {children}
            </ul>
        </div>
    )
}

const MenuItem = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    return (
        <li className='py-2! px-4! hover:bg-gray-100! cursor-pointer!' onClick={(e) => onClick?.()}>
            {children}
        </li>
    )
}

export { Menu, MenuButton, MenuList, MenuItem }


interface IButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}