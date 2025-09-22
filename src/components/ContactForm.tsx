'use client';

import axios, { type AxiosError } from 'axios';
import { useCallback, useRef, useState } from 'react';
import CAPTCHA from 'react-google-recaptcha';
import { useIsMounted } from 'usehooks-ts';
import InputField from '@/components/formfields/InputField';
import TextareaField from '@/components/formfields/TextAreaField';
import IconButton from '@/components/IconButton';
import { cn, isValidEmail } from '@/utils';

type FormRequestType = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  token?: string;
} & Record<string, unknown>;

type FormResponseType = {
  message: string;
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ text: '', isError: false });
  const isMounted = useIsMounted();

  const hasCaptcha = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const onCaptchaUpdated = useCallback((token: string | null) => {
    setToken(token ?? undefined);
  }, []);

  const onCaptchaFailed = useCallback(() => {
    setToken(undefined);
  }, []);

  const onClick = useCallback(
    async (e: React.MouseEvent) => {
      if (!formRef.current) {
        return;
      }

      try {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        const data: FormRequestType = {
          subject: 'Someone has seen your profile and wants to contact you',
        };
        if (hasCaptcha) {
          data.token = token;
        }
        formData.forEach((value, key) => {
          data[key] = (typeof value === 'string' ? value.trim() : value) ?? '';
        });

        if (hasCaptcha && !token) {
          return setFormStatus({
            text: 'Please confirm you are not robot.',
            isError: true,
          });
        }

        if (!data?.name || !data?.email || !data.message) {
          return setFormStatus({
            text: 'All fields are required to send a message.',
            isError: true,
          });
        }

        if (!isValidEmail(data.email)) {
          return setFormStatus({
            text: 'Enter a valid email address.',
            isError: true,
          });
        }
        setSending(true);
        const response = await axios.post<FormResponseType>(
          process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? '',
          { ...data },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        if (response.status === 200) {
          formRef.current.reset();
          setFormStatus({ text: response.data.message, isError: false });
        } else {
          setFormStatus({ text: response.data.message, isError: true });
        }
      } catch (err) {
        const error = err as AxiosError<FormResponseType>;
        setFormStatus({
          text: error?.response?.data?.message || 'Something went wrong!',
          isError: true,
        });
        console.error(error);
      } finally {
        setSending(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
          if (isMounted()) {
            setFormStatus({ text: '', isError: false });
          }
        }, 7000);
      }
    },
    [isMounted, token, hasCaptcha],
  );

  return (
    <form ref={formRef} id="form">
      <div className="py-2 h-11">
        {formStatus?.text ? (
          <p
            className={cn(
              'text-lg font-medium',
              formStatus.isError ? 'text-red-400' : 'text-green-500',
            )}
          >
            {formStatus.text}
          </p>
        ) : null}
      </div>
      <InputField type="text" id="name" title="Name" />
      <InputField type="text" id="email" title="E-mail" />
      <TextareaField id="message" title="Message" />
      {hasCaptcha ? (
        <div className="flex justify-center items-center my-4">
          <CAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
            hl="en"
            onChange={onCaptchaUpdated}
            onErrored={onCaptchaFailed}
            onExpired={onCaptchaFailed}
          />
        </div>
      ) : null}
      <div className="flex justify-center items-center mb-4">
        <IconButton
          title={!sending ? 'Send' : 'Sending'}
          icon={
            !sending
              ? 'icofont-paper-plane'
              : 'animate-spin icofont-spinner-alt-2'
          }
          type="submit"
          disabled={sending}
          onClick={onClick}
        />
      </div>
    </form>
  );
}
