Attribute VB_Name = "Module1"
Sub WorksheetLoop()
   Dim WS_Count As Integer
   Dim i As Integer

   WS_Count = ActiveWorkbook.Worksheets.Count

   For i = 1 To WS_Count
      'MsgBox ActiveWorkbook.Worksheets(i).Name
      ActiveWorkbook.Worksheets(i).Activate
      
      ModerateChallenge
      HardChallenge

   Next i

End Sub

Sub ModerateChallenge()
   Dim toAdd As Boolean, uniqueNumbers As Double, i As Double, j As Double
   Dim sumTotal As Double
   Dim sumOpen As Double, firstOpen As Double
   Dim sumClose As Double, lastClose As Double
   Dim szCol As Double
   
   'MsgBox (Range("A" & Rows.Count).End(xlUp).Row)
   szCol = Range("A" & Rows.Count).End(xlUp).Row
   
   Cells(1, 9).Value = Cells(1, 1).Value
   Cells(1, 10).Value = "Total Stock Volume"
   Cells(1, 11).Value = "Yearly change"
   Cells(1, 12).Value = "Percentage change"
   
   uniqueNumbers = 2
   toAdd = False
   
   Cells(uniqueNumbers, 9).Value = Cells(uniqueNumbers, 1).Value
   firstOpen = Cells(uniqueNumbers, 3).Value
      
   For i = 2 To szCol
      If Cells(i, 1).Value = Cells(uniqueNumbers, 9).Value Then
         sumTotal = sumTotal + Cells(i, 7).Value
         sumOpen = sumOpen + Cells(i, 3).Value
         sumClose = sumClose + Cells(i, 6).Value
         toAdd = False
      End If
      
      If toAdd = True Then
         Cells(uniqueNumbers + 1, 9).Value = Cells(i, 1).Value
         lastClose = Cells(i - 1, 6).Value
         Cells(uniqueNumbers, 10).Value = sumTotal
         'Cells(uniqueNumbers, 11).Value = sumClose - sumOpen
         Cells(uniqueNumbers, 11).Value = lastClose - firstOpen
         If (Cells(uniqueNumbers, 11).Value) < 0 Then
            Cells(uniqueNumbers, 11).Interior.Color = RGB(255, 0, 0)
         Else
            Cells(uniqueNumbers, 11).Interior.Color = RGB(0, 255, 0)
         End If
         
         If (firstOpen = 0) Then
            Cells(uniqueNumbers, 12).Value = 0
         Else
            Cells(uniqueNumbers, 12).Value = ((lastClose / firstOpen) - 1)
         End If
         
         Cells(uniqueNumbers, 12).NumberFormat = "0.00%"
         sumTotal = Cells(i, 7).Value
         sumOpen = Cells(i, 3).Value
         sumClose = Cells(i, 6).Value
         uniqueNumbers = uniqueNumbers + 1
         firstOpen = Cells(i, 3).Value
      End If
      
      toAdd = True
      
   Next i
   lastClose = Cells(szCol, 6).Value
   Cells(uniqueNumbers, 10).Value = sumTotal
   Cells(uniqueNumbers, 11).Value = lastClose - firstOpen
   If (Cells(uniqueNumbers, 11).Value) < 0 Then
      Cells(uniqueNumbers, 11).Interior.Color = RGB(255, 0, 0)
   Else
      Cells(uniqueNumbers, 11).Interior.Color = RGB(0, 255, 0)
   End If
         
   If (firstOpen = 0) Then
      Cells(uniqueNumbers, 12).Value = 0 - 1
   Else
      Cells(uniqueNumbers, 12).Value = ((lastClose / firstOpen) - 1)
   End If

   Cells(uniqueNumbers, 12).NumberFormat = "0.00%"
End Sub

Sub HardChallenge()
   Dim uniqueNumbersTotal As Double, uniqueNumbersMin As Double, uniqueNumbersMx As Double, i As Double, j As Double
   Dim maxPct As Double
   Dim minPct As Double
   Dim maxTotal As Double
   Dim minPctTicker As String
   Dim maxPctTicker As String
   Dim maxTicker As String
   Dim szCol As Double
   
   'MsgBox (Range("I" & Rows.Count).End(xlUp).Row)
   szCol = Range("I" & Rows.Count).End(xlUp).Row
   
   Cells(1, 15).Value = Cells(1, 1).Value
   Cells(1, 16).Value = "<value>"
   Cells(2, 14).Value = "Greatest % increase"
   Cells(3, 14).Value = "Greatest % Decrease"
   Cells(4, 14).Value = "Greatest total volume"
   
   uniqueNumbersMin = 2
   uniqueNumbersMx = 2
   uniqueNumbersTotal = 2
   
   For i = 3 To szCol
      If Cells(i, 12).Value < Cells(uniqueNumbersMin, 12).Value Then
         minPct = Cells(i, 12).Value
         minPctTicker = Cells(i, 9).Value
         uniqueNumbersMin = i
      End If
      
      If Cells(i, 12).Value > Cells(uniqueNumbersMx, 12).Value Then
         maxPct = Cells(i, 12).Value
         maxPctTicker = Cells(i, 9).Value
         uniqueNumbersMx = i
      End If
      
      If Cells(i, 10).Value > Cells(uniqueNumbersTotal, 10).Value Then
         maxTotal = Cells(i, 10).Value
         maxTicker = Cells(i, 9).Value
         uniqueNumbersTotal = i
      End If
   Next i
   
   Cells(3, 15).Value = minPctTicker
   Cells(3, 16).Value = minPct
   Cells(3, 16).NumberFormat = "0.00%"
   Cells(2, 15).Value = maxPctTicker
   Cells(2, 16).Value = maxPct
   Cells(2, 16).NumberFormat = "0.00%"
   Cells(4, 15).Value = maxTicker
   Cells(4, 16).Value = maxTotal
End Sub
