'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { ActionFunction } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';

const initialState = {
  message: '',
};

type Props = {
  action: ActionFunction;
  children: React.ReactNode;
};

export default function FormContainer({ action, children }: Props) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return <form action={formAction}>{children}</form>;
}
