/* eslint-disable operator-linebreak */
import React from 'react'
import { useFormikContext } from 'formik'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
// Custom dependencies
import Error from './Error'
import tw from '../../lib/tailwind'
import Modal from '../Modal'
import Wrapper from '../InputsWrapper'
import useToggle from '../../hooks/useToggle'
import Text from '../Text'
import FieldParams from './fieldParams'
import { useTailwindTheme } from '../../hooks/useTailwindTheme'

interface DateInputProps extends FieldParams {
  name: string
  style?: object
  showIcon?: boolean
  showLabel?: boolean
}
const DateInput: React.FC<DateInputProps> = ({
  name,
  label,
  style,
  showIcon = false,
  showLabel = false,
  ...otherProps
}) => {
  const [showModal, toggleModal] = useToggle(false)
  const [date, setDate] = React.useState(new Date())
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<any>()

  const { colors } = useTailwindTheme()

  // Get appropriate colors from our custom theme
  const iconColor = colors.text.primary
  const textColor = colors.text.primary

  const Icon = () => <Ionicons name="calendar" size={24} color={iconColor} />

  const handleDateChange = (_: DateTimePickerEvent, new_date?: Date) => {
    if (!new_date) return
    setDate(new Date(new_date))
    const formattedDate = new_date.toISOString().split('T')[0]
    setFieldValue(name, formattedDate)
  }
  return (
    <>
      <Wrapper
        iconLeft={showIcon ? <Icon /> : undefined}
        label={showLabel ? label : undefined}
        style={style}
        {...otherProps}
        onPress={toggleModal}
      >
        <Text style={[tw`text-black`, { color: textColor }]}>
          {date.toDateString()}
        </Text>
      </Wrapper>

      <Modal visible={showModal} onClose={toggleModal} onConfirm={toggleModal}>
        <View style={tw`items-center`}>
          <DateTimePicker
            display="spinner"
            value={date}
            mode="date"
            onChange={handleDateChange}
          />
        </View>
      </Modal>

      <Error
        error={typeof errors[name] === 'string' ? errors[name] : undefined}
        visible={typeof touched[name] === 'boolean' ? touched[name] : false}
      />
    </>
  )
}

export default DateInput
