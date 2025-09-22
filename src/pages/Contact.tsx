import ContactForm from '@/components/ContactForm';
import Pane from '@/components/Pane';
import Title from '@/components/Title';

export default function Contact() {
  return (
    <Pane className="py-10">
      <section className="pb-4 px-10 max-md:px-4">
        <Title>Contact</Title>
        <ContactForm />
      </section>
    </Pane>
  );
}
