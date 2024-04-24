const { getBranchFromRef, getCheckedOutBranch } = require('./build/git.cjs');

const CHECKED_BRANCH = process.env.GITHUB_REF
    ? getBranchFromRef(process.env.GITHUB_REF)
    : getCheckedOutBranch();

const WIP_BRANCH_PREFIXES = ['story', 'feature', 'bugfix'];

function log(...message) {
    console.log('[semantic-release config]', ...message);
}

function isWIPBranch(branchName) {
    return WIP_BRANCH_PREFIXES.some(workingBranchPrefix =>
        branchName.startsWith(workingBranchPrefix)
    );
}

function getProductionReleasePlugins() {
    if (isWIPBranch(CHECKED_BRANCH)) {
        log(
            `Branch "${CHECKED_BRANCH}" will not update the changelog file or create a GitHub release.`
        );
        return [];
    }

    return [
        '@semantic-release/github',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md'],
            },
        ],
    ];
}

module.exports = {
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        'next',
        'next-major',
        {
            name: 'beta',
            prerelease: true,
        },
        {
            name: 'alpha',
            prerelease: true,
        },
        {
            name: `{${WIP_BRANCH_PREFIXES.join(',')}}/*`,
            // eslint-disable-next-line no-template-curly-in-string
            prerelease: "${name.split('/')[1].toLowerCase()}", // e.g. branch 'feature/add-component' generates version 'v1.0.0-add-component.1'
            channel: 'development',
        },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
            },
        ],
        '@semantic-release/npm',
        ...getProductionReleasePlugins(),
    ],
};
