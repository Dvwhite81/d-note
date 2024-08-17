import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { createUserAction } from '@/utils/actions';

export default function RegisterPage() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-semibold mb-8 capitalize">Register</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createUserAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput type="text" name="name" label="name" defaultValue="" />
            <FormInput type="text" name="email" label="email" defaultValue="" />
            <FormInput
              type="password"
              name="password"
              label="password"
              defaultValue=""
            />
            <FormInput
              type="password"
              name="confirmation"
              label="confirm password"
              defaultValue=""
            />
          </div>
          <SubmitButton text="Register" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
