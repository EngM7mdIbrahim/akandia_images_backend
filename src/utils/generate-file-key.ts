export default function generateFileKey(uid: string, fid: string): string{
return `/users/${uid}/files/${fid}`;
}