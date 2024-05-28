function hasFlag(flag) {
    const args = process.argv.slice(2);
    return args.includes(flag);
}

module.exports = { hasFlag };