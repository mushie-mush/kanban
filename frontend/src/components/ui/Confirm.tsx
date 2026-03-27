/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import { Button } from './button';

interface ConfirmButton {
  label: string;
  type: 'default' | 'secondary' | 'destructive';
  onClick: () => void;
}

interface ConfirmDialogProps {
  title: string;
  description: string;
  buttons: ConfirmButton[];
}

const initialState = {
  isOpen: false,
  title: '',
  description: '',
  buttons: [] as ConfirmButton[],
  openDialog: ({ title, description, buttons }: ConfirmDialogProps) => {},
  closeDialog: () => {},
};

const reducer = (
  state: typeof initialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        description: action.payload.description,
        buttons: action.payload.buttons,
      };
    case 'CLOSE_DIALOG':
      return {
        ...state,
        isOpen: false,
        title: '',
        description: '',
        buttons: [],
      };
    default:
      return state;
  }
};

const ConfirmContext = createContext(initialState);

function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDialog = ({ title, description, buttons }: ConfirmDialogProps) => {
    dispatch({ type: 'OPEN_DIALOG', payload: { title, description, buttons } });
  };

  const closeDialog = () => {
    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <ConfirmContext.Provider value={{ ...state, openDialog, closeDialog }}>
      {children}
    </ConfirmContext.Provider>
  );
}

function useConfirm() {
  const context = useContext(ConfirmContext);

  if (context === undefined) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }

  return context;
}

function ConfirmDialog() {
  const { isOpen, title, description, buttons, closeDialog } = useConfirm();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.type}
              onClick={() => {
                button.onClick();
                closeDialog();
              }}
            >
              {button.label}
            </Button>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ConfirmProvider, useConfirm, ConfirmDialog };
