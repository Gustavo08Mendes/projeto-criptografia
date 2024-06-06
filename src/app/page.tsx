'use client'

import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Grid, Input, Option, Select, Stack } from "@mui/joy";
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering. 
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
    </Button>
  );
}

export default function Home() {

  const [result, setResult] = useState('');
  const [result2, setResult2] = useState('');
  const [mensagem, setMensagem] = useState<string>('');
  const [mensagemCriptografadaText, setmensagemCriptografadaText] = useState<string>('');
  const [matrizInvalida, setMatrizInvalida] = useState(1);
  const [matrizInvalida2, setMatrizInvalida2] = useState(1);
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);
  const [val4, setVal4] = useState(0);
  const [val21, setVal21] = useState(0);
  const [val22, setVal22] = useState(0);
  const [val23, setVal23] = useState(0);
  const [val24, setVal24] = useState(0);
  const [copy, setCopy] = useState(false);
  const [copy2, setCopy2] = useState(false);

  //Array com o alfabeto e sues valores
  var chars: { [key: string]: number } = {
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15, 'g': 16, 'h': 17, 'i': 18, 'j': 19,
    'k': 20, 'l': 21, 'm': 22, 'n': 23, 'o': 24, 'p': 25, 'q': 26, 'r': 27, 's': 28, 'u': 29,
    't': 30, 'v': 31, 'w': 32, 'x': 33, 'y': 34, 'z': 35, ' ': 36, '*': 37, '': 38,
    'á': 39, 'à': 40, 'ã': 41, 'â': 42, 'é': 43, 'ê': 44, 'í': 45, 'ó': 46, 'ô': 47,
    'õ': 48, 'ú': 49, 'ç': 50, 'A': 51, 'B': 52, 'C': 53, 'D': 54, 'E': 55, 'F': 56,
    'G': 57, 'H': 58, 'I': 59, 'J': 60, 'K': 61, 'L': 62, 'M': 63, 'N': 64, 'O': 65,
    'P': 66, 'Q': 67, 'R': 68, 'S': 69, 'T': 70, 'U': 71, 'V': 72, 'W': 73, 'X': 74,
    'Y': 75, 'Z': 76, '!': 77, '?': 78, '(': 79, ')': 80, '¡': 81, '¿': 82, '.': 83,
    'Á': 84, 'À': 85, 'Ä': 86, 'Å': 87, 'Æ': 88, 'È': 89, 'Ê': 90, 'Ë': 91, 'Ì': 92,
    'Í': 93, 'Î': 94, 'Ï': 95, 'Ð': 96, 'Ñ': 97, 'Ò': 98, 'Ó': 99, 'Ô': 100, 'Õ': 101,
    'Ö': 102, 'Ø': 103, 'Ù': 104, 'Ú': 105, 'Û': 106, 'Ü': 107, 'Ý': 108, 'Þ': 109, 'ß': 110,
    '1': 111, '2': 112, '3': 113, '4': 114, '5': 115, '6': 116, '7': 117, '8': 118, '9': 119,
    '0': 120, ',': 121, ';': 122, ':': 123, '-': 124, '_': 125, '+': 126, '=': 127, '[': 128,
    ']': 129, '{': 130, '}': 131, '#': 132, '@': 133, '$': 134, '%': 135, '^': 136, '&': 137,
    '/': 138, '\\': 139, '<': 140, '>': 141, '|': 142, '~': 143, '`': 144, '"': 145, "'": 146,
  };

  //Código para o calculo de matrizes
  function multiplicarMatrizes(matriz1: number[][], matriz2: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < matriz1.length; i++) {
      result[i] = [];
      for (let j = 0; j < matriz2[0].length; j++) {
        result[i][j] = 0;
        for (let k = 0; k < matriz1[0].length; k++) {
          result[i][j] += matriz1[i][k] * matriz2[k][j];
        }
      }
    }
    return result;
  }

  function tranformarEmMatriz(mensagem: number[]) {
    var meio = Math.ceil(mensagem.length / 2);
    return [mensagem.slice(0, meio), mensagem.slice(meio)];
  }

  //Criando uma matriz com base no texto
  var matriz: number[][] = Array.from({ length: Math.ceil(mensagem.length / 2) }, () => []);

  //loop para encontar os valores com base ao alfabeto
  for (var i = 0; i < mensagem.length; i++) {
    var char = mensagem[i];
    var charEncriptado = chars[char];
    if (charEncriptado !== undefined) {
      var rowIndex = Math.floor(i / 2);
      var columnIndex = i % 2;
      matriz[rowIndex][columnIndex] = charEncriptado;
    }
  }

  // Transformando a matriz em um array unidimensional
  var unidimensional = matriz.flat();

  // Dividindo o array em duas partes
  var matrizBidimensional = tranformarEmMatriz(unidimensional);

  // Adicionando valores extras para que as matrizes tenham o mesmo tamanho
  matrizBidimensional[1].length < matrizBidimensional[0].length ? matrizBidimensional[1].push(38) : null;

  //Criando a chave
  var chave = [[val1, val2], [val3, val4]];

  //Multiplicando as matrizes
  if (mensagem.length != 0) {
    var mensagemCriptografada = multiplicarMatrizes(chave, matrizBidimensional);
  }

  //**********************  Descriptografia  *********************************

  //Verificando se as matrizes sao invertiveis

  //Realiza a matriz inversa
  function matrizInversa(matriz: number[][]) {

    const det = matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];

    const inversa = [
      [matriz[1][1] / det, -matriz[0][1] / det],
      [-matriz[1][0] / det, matriz[0][0] / det]
    ];

    return inversa;
  }



  //pegando o valor criptografado e transformando em um array de inteiros
  if (mensagemCriptografadaText.length != 0) {

    let valoresSeparados = mensagemCriptografadaText.split(',').map((value) => parseInt(value));

    var matrizCriptogtafada = tranformarEmMatriz(valoresSeparados);

    var chaveDescriptografar = [[val21, val22], [val23, val24]];

    var chaveReversa = matrizInversa(chaveDescriptografar);

    if (chaveReversa) {
      var menssagemDescriptografada = multiplicarMatrizes(chaveReversa, matrizCriptogtafada);

      var caracteres = []
      for (let m = 0; m < menssagemDescriptografada.length; m++) {
        for (let n = 0; n < menssagemDescriptografada[m].length; n++) {
          caracteres.push(Math.round(menssagemDescriptografada[m][n]));
        }
      }

      var matrizVerificada = tranformarEmMatriz(caracteres);

    }
  }

  // Função para descriptografar a mensagem criptografada e mostrar na tela
  const descriptografar = () => {
    if (mensagemCriptografadaText.length != 0) {
      var valormensagem = "";
      for (var i = 0; i < matrizVerificada.length; i++) {
        for (var j = 0; j < matrizVerificada[i].length; j++) {
          var charDescriptografado = Object.keys(chars).find(key => chars[key] === matrizVerificada[i][j]);
          if (charDescriptografado !== undefined) {
            valormensagem += charDescriptografado;
          }
        }
      }
      setResult2(valormensagem);
    }
  }

  function verificarMatriz(matriz: number[][]) {

    const det = matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];

    if (det === 0) {
      setMatrizInvalida(0);
    } else {
      setMatrizInvalida(1);
    }

    const det2 = val21 * val24 - val22 * val23;

    if (det2 === 0) {
      setMatrizInvalida2(0);
    } else {
      setMatrizInvalida2(1);
    }
  }


  useEffect(() => {

    verificarMatriz(chave);

    if (mensagem.length != 0) {
      setResult(mensagemCriptografada.toString());
    }

    if (mensagem.length == 0) {
      mensagem.length == 0 ? setResult('') : null;
    }

    if (copy == true) {
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    }

    descriptografar();

  }, [matrizBidimensional, descriptografar]);

  useEffect(() => {
    if (copy2 == true) {
      setTimeout(() => {
        setCopy2(false);
      }, 1000);
    }
  }, [copy2]);
  
  return (
    <Stack
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: "neutral.outlinedDisabledBorder", Width: '1200px', minHeight: '100vh', pb: '50px' }}
    >
      <Stack sx={{ position: 'fixed', right: '70px', top: '70px' }}>
        <CssVarsProvider>
          <ModeToggle />
        </CssVarsProvider>
      </Stack>
      <Box sx={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }} width={{ xs: 300, sm: 600, md: 800, lg: 1200 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>CRIPTOGRAFIA</Typography>
      </Box>
      <Stack
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '0', mt: '30px', gap: 2 }}
        width={{ xs: 300, sm: 600, md: 800, lg: 1200 }}
        justifyContent={{ xs: 'center', sm: 'center' }}
      >

        <Stack
          sx={{ display: 'flex', gap: 2, width: '100%', alignItems: 'end', justifyContent: 'end', flexDirection: 'column' }}
          justifyContent={{ xs: 'center', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >

          <Stack sx={{ gap: 2, width: '50%', alignItems: 'center', justifyContent: 'end', flexDirection: 'row', pr: 1.5 }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Chave:
            </Typography>
            <Input type="number" sx={{ width: 80 }} value={val1} onChange={(e) => setVal1(parseInt(e.target.value))}
            />
            <Input type="number" sx={{ width: 80 }} value={val2} onChange={(e) => setVal2(parseInt(e.target.value))}
            />
            <Input type="number" sx={{ width: 80 }} value={val3} onChange={(e) => setVal3(parseInt(e.target.value))}
            />
            <Input type="number" sx={{ width: 80 }} value={val4} onChange={(e) => setVal4(parseInt(e.target.value))}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, mt: '10px' }}
        width={{ xs: 300, sm: 600, md: 800, lg: 1200 }}
        height={{ xs: 200, sm: 200, lg: 200 }}
        marginTop={{ xs: 20, sm: 3, lg: 3 }}
      >
        <Textarea
          placeholder={matrizInvalida != 0 ? "Digite o texto que sera criptografado" : "Chave inválida"}
          minRows={2}
          maxRows={4}
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          sx={{ width: '100%', minHeight: '100%', mt: 2, position: 'relative', pt: 3, transition: 'all 0.4s' }}
          startDecorator={<Button sx={{ right: 5, top: 3, position: 'absolute', bgcolor: 'transparent', zIndex: 1, color: 'red', cursor: 'pointer', p: 0, transition: 'all 0.4s', '&:hover': { bgcolor: 'transparent' }, '&:disabled': { bgcolor: 'transparent' } }} onClick={() => { setMensagem(''); setResult('') }} disabled={mensagem.length == 0}><DeleteForeverIcon /></Button>}
          color={matrizInvalida != 0 ? 'neutral' : 'danger'}
          endDecorator={
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {mensagem.length} character(s)
            </Typography>
          }
          readOnly={matrizInvalida != 0 ? false : true}
        />
        <Textarea
          placeholder="Aqui sera exibido a criptografia..."
          minRows={2}
          maxRows={4}
          value={result}
          sx={{ width: '100%', minHeight: '100%', mt: 2, pt: 3, position: 'relative', transition: 'all 0.4s' }}
          startDecorator={
            <Box
              sx={{ display: mensagem.length < 1 ? 'none' : 'block', color: copy == false ? 'block' : 'green', right: 5, top: 3, position: 'absolute', zIndex: 1, cursor: 'pointer', p: 0, bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' } }}
              onClick={() => { navigator.clipboard.writeText(result); setCopy(true); }}
            >
              {copy == true ? <CheckIcon /> : <ContentCopyIcon />}
            </Box>}
          readOnly
        />
      </Stack>
      <Box sx={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }} width={{ xs: 300, sm: 600, md: 800, lg: 1200 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>DESCRIPTOGRAFIA</Typography>
      </Box>
      <Stack
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '0', mt: '30px', gap: 2 }}
        width={{ xs: 300, sm: 600, md: 800, lg: 1200 }}
        justifyContent={{ xs: 'center', sm: 'center' }}
      >
        <Stack
          sx={{ display: 'flex', width: '100%', alignItems: 'end', justifyContent: 'end', flexDirection: 'row', mr: 1.5 }}
          justifyContent={{ xs: 'center', sm: 'center' }}
        >
          <Stack sx={{ gap: 2, width: '50%', alignItems: 'center', justifyContent: 'end', flexDirection: 'row', pr: 1.5 }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Chave:
            </Typography>
            <Input type="number" sx={{ width: 80 }} value={val21} onChange={(e) => setVal21(parseInt(e.target.value))}
            />
            <Input type="number" sx={{ width: 80 }} value={val22} onChange={(e) => setVal22(parseInt(e.target.value))}
            />
            <Input type="number" sx={{ width: 80 }} value={val23} onChange={(e) => setVal23(parseInt(e.target.value))}
            />
            <Input type="number" sx={{ width: 80 }} value={val24} onChange={(e) => setVal24(parseInt(e.target.value))}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, mt: '10px' }}
        width={{ xs: 300, sm: 600, md: 800, lg: 1200 }}
        height={{ xs: 200, sm: 200, lg: 200 }}
        marginTop={{ xs: 20, sm: 3, lg: 3 }}
      >
        <Textarea
          placeholder={matrizInvalida2 != 0 ? "Digite o texto que sera decriptografado" : "Chave inválida"}
          minRows={2}
          maxRows={4}
          value={mensagemCriptografadaText}
          onChange={e => setmensagemCriptografadaText(e.target.value)}
          sx={{ width: '100%', minHeight: '100%', mt: 2, position: 'relative', pt: 3, transition: 'all 0.4s' }}
          startDecorator={<Button sx={{ right: 5, top: 3, position: 'absolute', bgcolor: 'transparent', zIndex: 1, color: 'red', cursor: 'pointer', p: 0, transition: 'all 0.4s', '&:hover': { bgcolor: 'transparent' }, '&:disabled': { bgcolor: 'transparent' } }} onClick={() => { setmensagemCriptografadaText(''); setResult2('') }} disabled={mensagemCriptografadaText.length == 0}><DeleteForeverIcon /></Button>}
          color={matrizInvalida2 != 0 ? 'neutral' : 'danger'}
          endDecorator={
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {mensagemCriptografadaText.length} character(s)
            </Typography>
          }
          readOnly={matrizInvalida2 != 0 ? false : true}
        />
        <Textarea
          placeholder="Aqui sera exibido a descriptografado..."
          minRows={2}
          maxRows={4}
          value={result2}
          sx={{ width: '100%', minHeight: '100%', mt: 2, pt: 3, position: 'relative', transition: 'all 0.4s' }}
          startDecorator={
            <Box
              sx={{ display: mensagemCriptografadaText.length < 1 ? 'none' : 'block', color: copy2 == false ? 'block' : 'green', right: 5, top: 3, position: 'absolute', zIndex: 1, cursor: 'pointer', p: 0, bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' } }}
              onClick={() => { navigator.clipboard.writeText(result2); setCopy2(true); }}
            >
              {copy2 == true ? <CheckIcon /> : <ContentCopyIcon />}
            </Box>}
          readOnly
        />
      </Stack>
    </Stack>
  );
}
