interface Props {
  title?: string
};

export const AppHeader = ({title = 'XenoChange'}: Props) => {
  return (
    <div className='app-header'>
        <p>{title}</p>
    </div>
  )
}
