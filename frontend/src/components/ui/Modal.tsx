/* eslint-disable react-refresh/only-export-components */
import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './dialog';

interface IModelContext {
  window: string;
  openModal: (window: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModelContext | null>(null);

function Modal({ children }: { children: ReactNode }) {
  const [window, setWindow] = useState('');

  const openModal = setWindow;
  const closeModal = () => setWindow('');

  return (
    <ModalContext.Provider value={{ window, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  window,
}: {
  children: ReactElement<{ onClick?: () => void }>;
  window: string;
}) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Open must be used within a Modal');
  }

  const { openModal } = context;

  return cloneElement(children, {
    onClick: () => openModal(window),
  });
}

function WindowHeader({ children }: { children: ReactNode }) {
  return <DialogHeader>{children}</DialogHeader>;
}

function WindowFooter({ children }: { children: ReactNode }) {
  return <DialogFooter>{children}</DialogFooter>;
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Window must be used within a Modal');
  }

  const { window, closeModal } = context;

  const isOpen = window === name;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a Modal');
  }

  return context;
}

Modal.Open = Open;
Modal.Window = Window;
Modal.WindowHeader = WindowHeader;
Modal.WindowFooter = WindowFooter;

export default Modal;

export { useModal };
