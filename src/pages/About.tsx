import { Code2, Users, History, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </span>
          SYNCODE
        </Link>
        <button onClick={() => navigate(user ? '/dashboard' : '/login')}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Get started <ArrowRight className="h-4 w-4" />
        </button>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">About the project</p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">A shared workspace for building software together.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          SYNCODE brings collaborative editing, project files, team chat, revision history, and code execution into one focused browser-based workspace.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Users, title: 'Work together', description: 'Invite teammates, see who is online and edit shared files in real time.' },
            { icon: Code2, title: 'Code in one place', description: 'Use a familiar editor with file navigation, syntax highlighting and an integrated terminal.' },
            { icon: History, title: 'Keep a simple history', description: 'Review recent autosaves and previous file revisions when you need them.' },
            { icon: ShieldCheck, title: 'Project access', description: 'Use account-based access and project roles to manage who can view or edit.' },
          ].map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
        <p className="mt-12 border-t border-border pt-6 text-xs leading-5 text-muted-foreground">
          SYNCODE is maintained as an independently customized project. Third-party components and inherited code remain subject to their respective licenses; see the repository's LICENSE file and dependency notices.
        </p>
      </section>
    </main>
  );
};

export default About;
