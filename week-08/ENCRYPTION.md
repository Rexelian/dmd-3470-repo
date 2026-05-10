# Solution File Encryption

The solution files (`solution.html` and `css/solution.css`) are encrypted using git-crypt to prevent students from accessing them.

## For You (Instructor)

### Your Current Setup
- ✅ Encryption is active and working
- ✅ Files appear as normal plaintext in your working directory
- ✅ Files are encrypted in the git repository
- ✅ Encryption key saved at: `~/.picture-element-key`

### Editing Solution Files
You can edit `solution.html` and `css/solution.css` normally:
- Files are automatically decrypted when you work on them
- Files are automatically encrypted when you commit
- No extra steps needed!

### On Another Machine
To unlock the encrypted files:
```bash
# Copy the key file to the new machine
# Then in the repository:
git-crypt unlock ~/.picture-element-key
```

### For Students
When students clone the repository without the key:
- `solution.html` and `css/solution.css` appear as encrypted binary files
- They cannot read or use them
- All other files (index.html, tests, etc.) work normally

## Testing Encryption

To verify encryption is working:
```bash
# Check what students would see (encrypted binary):
git show HEAD:solution.html | head -20

# Check what you see (normal plaintext):
cat solution.html | head -20
```

## Important Notes

1. **Keep the key safe**: `~/.picture-element-key` - back this up!
2. **Never commit the key**: It's automatically gitignored
3. **Students see encrypted files**: They'll see binary gibberish if they try to view solution files
4. **Tests still work**: The test suite can still access encrypted files when needed

## Backup Your Key

```bash
# Save a backup copy
cp ~/.picture-element-key ~/Dropbox/picture-element-key
# Or email it to yourself, store in password manager, etc.
```
