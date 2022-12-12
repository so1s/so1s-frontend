import { zip } from 'fp-ts/lib/Array';
import { describe, it, expect } from 'vitest';
import { removeSubdomain } from '../../constants';

describe('removeSubdomain() tests', () => {
    const tests = (map: Function, its: string[], toBes: string[]) =>
        zip(
            its.map((e) => map(e)),
            toBes
        ).forEach(([it, toBe]) => expect(it).toBe(toBe));

    it('Returns same domain if subdomain not exits', async () => {
        tests(
            removeSubdomain,
            ['https://so1s.io', 'http://so1s.io'],
            ['https://so1s.io', 'http://so1s.io']
        );
    });
    it('Returns base domain with protocol if subdomain exists', async () => {
        tests(
            removeSubdomain,
            ['https://frontend.so1s.io', 'http://frontend.so1s.io'],
            ['https://so1s.io', 'http://so1s.io']
        );
    });
    it('Returns base domain with protocol if nested subdomain exists', async () => {
        tests(
            removeSubdomain,
            [
                'https://frontend.nested.so1s.io',
                'http://frontend.nested.so1s.io',
            ],
            ['https://so1s.io', 'http://so1s.io']
        );
    });
});
