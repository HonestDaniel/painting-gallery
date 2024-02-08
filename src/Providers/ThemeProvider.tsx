import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

type TypeSetState<T> = Dispatch<SetStateAction<T>>

interface IContext {
  isDarkTheme: boolean;
  setIsDarkTheme: TypeSetState<boolean> | null;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// Понимаю, что можно было сделать это через Redux, но так вышло, что первым делом я реализовал именно
// смену темы и сделал это через контекст, а потом решил не переделывать.
// Зато вы видите, что я и с контекстом умею работать)
const ThemeContext = createContext<IContext>({
  isDarkTheme: false,
  setIsDarkTheme: null,
});

function ThemeProvider({ children }: ThemeProviderProps) {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const contextValue = useMemo(() => ({
    isDarkTheme,
    setIsDarkTheme,
  }), [isDarkTheme, setIsDarkTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
