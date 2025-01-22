import PrivacyNotice from 'components/PrivacyNotice'
import { useFormikContext } from 'formik'

interface Props
  extends Omit<
    React.ComponentProps<typeof PrivacyNotice>,
    'privacyType' | 'onEdit'
  > {
  name: string
}
const PrivacyNoticeField: React.FC<Props> = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, values } = useFormikContext<any>()
  return (
    <PrivacyNotice
      privacyType={values[name]}
      onBlur={() => setFieldTouched(name)}
      onEdit={handleChange(name)}
      {...otherProps}
    />
  )
}

export default PrivacyNoticeField
