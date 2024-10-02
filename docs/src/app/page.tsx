import Intro from '@/markdown/Intro.mdx';
import { Header } from './header';
export default function () {
    return (
        <div className="container max-w-3xl mx-auto prose p-4">
            <Header />

            <Intro />
        </div>
    );
}
