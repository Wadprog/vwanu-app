interface NameToPictureProps {
  firstName: string
  lastName: string
}

export default ({ firstName, lastName }: NameToPictureProps): string => {
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
}
