const { execSync: exec } = require('child_process');

async function isDetachedHeadError(error) {
    // Status 128 = Error "fatal: ref HEAD is not a symbolic ref"
    return error.status === 128;
}

module.exports = {
    getBranchFromRef(ref) {
        return ref.replace('refs/heads/', '');
    },
    getCheckedOutBranch() {
        try {
            return exec('git symbolic-ref --short HEAD')
                .toString('utf-8')
                .trim();
        } catch (error) {
            if (isDetachedHeadError(error)) {
                throw new Error("Can't get ref from detached HEAD.");
            }

            throw error;
        }
    },
};
